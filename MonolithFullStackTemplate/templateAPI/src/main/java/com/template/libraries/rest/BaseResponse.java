package com.template.libraries.rest;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class BaseResponse {

    @JsonProperty("_data")
    @JsonSerialize(using = ResponseSerializer.class)
    private PayloadData data;

    @JsonProperty("_metadata")
    private Map<String, Metadatable> metadata = new HashMap<>();

    @JsonProperty("_metaLinks")
    private Map<String, LinkDetails> links = new HashMap<>();

    @JsonProperty("_messages")
    private Object message;

    public void addMetaData() {
        metadata.put("personId", new Metadata(true, null, true, Arrays.asList(new MetadataEmnbedded("123", "WilIAm"))));
    }

    public BaseResponse() {
    }

    public PayloadData getData() {
        return data;
    }

    public void setData(final String rootName, final Object data) {
        this.data = new PayloadData(rootName, data);
    }

    public Map<String, Metadatable> getMetadata() {
        return metadata;
    }

    public void setMetadata(final Map<String, Metadatable> metadata) {
        this.metadata = metadata;
    }

    public Map<String, LinkDetails> getLinks() {
        return links;
    }

    public void setLinks(final Map<String, LinkDetails> links) {
        this.links = links;
    }

    public Object getMessage() {
        return message;
    }

    public void setMessage(final Object message) {
        this.message = message;
    }
}

class PayloadData {
    private final String rootName;
    private final Object data;

    public PayloadData(final String rootName, final Object data) {
        this.rootName = rootName;
        this.data = data;
    }

    public String getRootName() {
        return rootName;
    }

    public Object getData() {
        return data;
    }
}