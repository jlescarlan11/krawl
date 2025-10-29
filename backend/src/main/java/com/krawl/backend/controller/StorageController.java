package com.krawl.backend.controller;

public class StorageController {
    
}
package com.krawl.backend.controller;

import com.krawl.backend.service.StorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/storage")
@RequiredArgsConstructor
public class StorageController {

    private final StorageService storageService;

    /**
     * Test endpoint for image upload
     */
    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "gemId", required = false) String gemId
    ) {
        try {
            UUID id = gemId != null ? UUID.fromString(gemId) : UUID.randomUUID();
            String imageUrl = storageService.uploadImage(file, id);
            
            Map<String, String> response = new HashMap<>();
            response.put("url", imageUrl);
            response.put("message", "Image uploaded successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error uploading image", e);
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Test endpoint for image deletion
     */
    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, String>> deleteImage(
            @RequestParam("url") String imageUrl
    ) {
        try {
            storageService.deleteImage(imageUrl);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Image deleted successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error deleting image", e);
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}