package com.krawl.backend.util;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class PaginationHelper {
    
    private static final String DEFAULT_SORT_BY = "createdAt";
    private static final String DEFAULT_SORT_DIR = "desc";
    private static final int DEFAULT_PAGE_SIZE = 20;
    private static final int MAX_PAGE_SIZE = 100;
    
    /**
     * Creates a Pageable object with pagination and sorting
     * 
     * @param page Zero-based page index (default: 0)
     * @param size Page size (default: 20, max: 100)
     * @param sortBy Field to sort by (default: "createdAt")
     * @param sortDir Sort direction: "asc" or "desc" (default: "desc")
     * @return Pageable object
     */
    public Pageable createPageable(Integer page, Integer size, String sortBy, String sortDir) {
        // Normalize page number
        int pageNumber = (page != null && page >= 0) ? page : 0;
        
        // Normalize page size (with max limit)
        int pageSize = (size != null && size > 0) ? Math.min(size, MAX_PAGE_SIZE) : DEFAULT_PAGE_SIZE;
        
        // Normalize sort field
        String sortField = (sortBy != null && !sortBy.trim().isEmpty()) 
            ? sortBy.trim() 
            : DEFAULT_SORT_BY;
        
        // Normalize sort direction
        String sortDirection = (sortDir != null && "asc".equalsIgnoreCase(sortDir)) 
            ? "asc" 
            : DEFAULT_SORT_DIR;
        
        Sort sort = "asc".equalsIgnoreCase(sortDirection)
            ? Sort.by(sortField).ascending()
            : Sort.by(sortField).descending();
        
        return PageRequest.of(pageNumber, pageSize, sort);
    }
    
    /**
     * Creates a Pageable object with default sorting by createdAt desc
     */
    public Pageable createPageable(Integer page, Integer size) {
        return createPageable(page, size, null, null);
    }
    
    /**
     * Creates a Pageable object with default page size
     */
    public Pageable createPageable(Integer page, String sortBy, String sortDir) {
        return createPageable(page, null, sortBy, sortDir);
    }
}

