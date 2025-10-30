package com.krawl.backend.service.impl;

import com.krawl.backend.entity.Tag;
import com.krawl.backend.repository.TagRepository;
import com.krawl.backend.service.TagService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {
    
    private final TagRepository tagRepository;
    
    @Override
    @Cacheable(value = "tags")
    @Transactional(readOnly = true)
    public List<Tag> getAllTags() {
        log.debug("Fetching all tags from database");
        return tagRepository.findAll();
    }
    
    @Override
    @Cacheable(value = "tags", key = "#tagName")
    @Transactional(readOnly = true)
    public Optional<Tag> getTagByName(String tagName) {
        log.debug("Fetching tag by name: {}", tagName);
        return tagRepository.findByTagName(tagName);
    }
    
    @Override
    @CacheEvict(value = "tags", allEntries = true)
    @Transactional
    public Tag createTag(String tagName) {
        log.info("Creating new tag: {}", tagName);
        
        if (tagRepository.findByTagName(tagName).isPresent()) {
            throw new RuntimeException("Tag already exists: " + tagName);
        }
        
        Tag tag = new Tag();
        tag.setTagName(tagName);
        return tagRepository.save(tag);
    }
    
    @Override
    @CacheEvict(value = "tags", allEntries = true)
    @Transactional
    public void deleteTag(Integer tagId) {
        log.info("Deleting tag with id: {}", tagId);
        tagRepository.deleteById(tagId);
    }
}

