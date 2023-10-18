
package com.template.people.images;

import com.template.exceptions.DomainException;
import com.template.exceptions.EntityNotFoundException;
import com.template.libraries.files.File;
import com.template.libraries.files.FileService;
import com.template.users.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

@Service
public class PersonPhotoAppService {
    @Autowired
    private PersonPhotoRepository repository;
    @Autowired
    private FileService fileService;
    @Autowired
    private PersonPhotoLinkProvider linkProvider;

    public PersonPhotoResource create(UserDetails userDetails, MultipartFile fileToCreate) {
        // get the user logged on id
        Long currentUserLoggedOnId = ((User) userDetails).getId();

        try {
            File file = fileService.store(fileToCreate);
            PersonPhoto personPhoto = createPersonPhoto(currentUserLoggedOnId, file.getId());

            return this.mapToResource(file, personPhoto);

        } catch (Exception e) {
            throw new DomainException("could not store file");
        }
    }

    public PersonPhotoResource findById(Long userId, String id) {
        final PersonPhoto personPhoto = this.repository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("could not find user for given id"));

        return fileService.getFile(id)
                .map(file -> this.mapToResource(file, personPhoto))
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

    public void deleteById(Long userId, String id) {
        final PersonPhoto personPhoto = this.repository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("could not find user for given id"));

        // delete the file and the person photo
        fileService.delete(id);
        repository.delete(personPhoto);
    }

    private PersonPhotoResource mapToResource(File file, PersonPhoto personPhoto) {
        PersonPhotoResource personPhotoResource = PersonPhotoResource.builder()
                .id(personPhoto.getId())
                .userId(personPhoto.getUserId())
                .fileId(file.getId())
                .name(file.getName())
                .data(null)
                .mimeType(file.getType())
                .build();

        List<Link> linksToAdd = Arrays.asList(
                linkProvider.generateSelfLink(personPhoto.getUserId(), file.getId()),
                linkProvider.generateDownloadLink(personPhoto.getUserId(), file.getId())
        );
        personPhotoResource.addLinks(linksToAdd);

        return personPhotoResource;
    }

    private PersonPhoto createPersonPhoto(Long currentUserLoggedOnId, String fileId) {
        PersonPhoto personPhoto = PersonPhoto.builder()
                .userId(currentUserLoggedOnId)
                .fileId(fileId)
                .build();

        repository.save(personPhoto);

        return personPhoto;
    }
}
