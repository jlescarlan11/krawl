package com.krawl.backend.service;

import com.krawl.backend.entity.Tag;

import java.util.List;
import java.util.Optional;

public interface TagService {
    List<Tag> getAllTags();
    Optional<Tag> getTagByName(String tagName);
    Tag createTag(String tagName);
    void deleteTag(Integer tagId);
}

