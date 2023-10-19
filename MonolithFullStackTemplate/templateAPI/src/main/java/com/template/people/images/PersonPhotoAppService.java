
package com.template.people.images;

import com.template.exceptions.DomainException;
import com.template.exceptions.EntityNotFoundException;
import com.template.libraries.files.File;
import com.template.libraries.files.FileService;
import com.template.people.events.PersonImageAddedEvent;
import com.template.people.events.PersonImageRemovedEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Objects;

@Service
public class PersonPhotoAppService {
    @Autowired
    private PersonPhotoRepository repository;

    @Autowired
    private FileService fileService;

    @Autowired
    private PersonPhotoLinkProvider linkProvider;

    @Autowired
    private ApplicationEventPublisher publisher;

    @Transactional(propagation = Propagation.REQUIRED)
    public PersonPhotoResource create(Long personId, MultipartFile fileToCreate) {
        try {
            File file = fileService.compressAndStore(fileToCreate);
            PersonPhoto personPhoto = createUpdatePersonPhoto(personId, file.getId());
            publishPersonImageAddedEvent(personId, personPhoto.getFileId());

            return this.mapToResource(file, personPhoto);

        } catch (Exception e) {
            throw new DomainException("could not store file");
        }
    }

    public PersonPhotoResource findById(Long personId, String id) {
        return fileService.getFile(id)
                .map(file -> this.mapToResource(file, resolvePersonPhoto(personId)))
                .orElseThrow(() -> new EntityNotFoundException("could not find file for given id"));
    }

    public PersonPhotoResource downloadPhoto(String id) {
        return fileService.getFile(id)
                .map(file -> PersonPhotoResource.builder()
                        .data(file.getData())
                        .mimeType(file.getType())
                        .build())
                .orElseThrow(() -> new EntityNotFoundException("could not find file for given id"));
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void deleteById(Long personId, String id) {
        // delete the file and the person photo
        fileService.delete(id);
        repository.delete(resolvePersonPhoto(personId));

        publishPersonImageRemovedEvent(personId);
    }

    private PersonPhotoResource mapToResource(File file, PersonPhoto personPhoto) {
        PersonPhotoResource personPhotoResource = PersonPhotoResource.builder()
                .id(personPhoto.getId())
                .personId(personPhoto.getPersonId())
                .fileId(file.getId())
                .name(file.getName())
                .data(null)
//                .encodedData(convertToBase64(file.getData()))
                .mimeType(file.getType())
                .size(file.getData().length)
                .build();

        List<Link> linksToAdd = Arrays.asList(
                linkProvider.generateSelfLink(personPhoto.getPersonId(), file.getId()),
                linkProvider.generateDownloadLink(personPhoto.getPersonId(), file.getId())
        );
        personPhotoResource.addLinks(linksToAdd);

        return personPhotoResource;
    }

    private static String convertToBase64(byte[] imageBytes) {
        return Base64.getEncoder().encodeToString(imageBytes);
    }

    private PersonPhoto createUpdatePersonPhoto(Long personId, String fileId) {
        PersonPhoto currentPersonPhoto = this.repository.findByPersonId(personId)
                .orElse(null);

        if (Objects.nonNull(currentPersonPhoto)) {
            // delete the current person photo file
            fileService.delete(currentPersonPhoto.getFileId());

            currentPersonPhoto.updateFileId(fileId);
            repository.save(currentPersonPhoto);

            return currentPersonPhoto;
        } else {
            PersonPhoto personPhotoCreated = PersonPhoto.builder()
                    .personId(personId)
                    .fileId(fileId)
                    .build();
            repository.save(personPhotoCreated);

            return personPhotoCreated;
        }
    }

    private PersonPhoto resolvePersonPhoto(Long personId) {
        return this.repository.findByPersonId(personId)
                .orElseThrow(() -> new EntityNotFoundException("could not find person photo for given person id"));
    }

    private void publishPersonImageAddedEvent(Long personId, String imageId) {
        publisher.publishEvent(PersonImageAddedEvent.builder()
                .id(personId)
                .imageId(imageId)
                .build());
    }

    private void publishPersonImageRemovedEvent(Long personId) {
        publisher.publishEvent(PersonImageRemovedEvent.builder()
                .id(personId)
                .build());
    }
}
