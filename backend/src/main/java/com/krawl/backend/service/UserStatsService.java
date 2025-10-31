package com.krawl.backend.service;

import java.util.UUID;

public interface UserStatsService {

    Counts getCounts(UUID userId);

    class Counts {
        private final int gemsCreated;
        private final int krawlsCreated;

        public Counts(int gemsCreated, int krawlsCreated) {
            this.gemsCreated = gemsCreated;
            this.krawlsCreated = krawlsCreated;
        }

        public int getGemsCreated() {
            return gemsCreated;
        }

        public int getKrawlsCreated() {
            return krawlsCreated;
        }
    }
}


