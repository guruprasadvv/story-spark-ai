import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middleware/auth.middleware";
import { CollectionController } from "./collection.controller";
import { createRateLimiter } from "../../middleware/ip.rate-limiter";

const router = express.Router();

const ALL_AUTH = [
  ENUM_USER_ROLE.USER,
  ENUM_USER_ROLE.WRITER,
  ENUM_USER_ROLE.ADMIN,
  ENUM_USER_ROLE.SUPER_ADMIN,
] as const;

/**
 * Per-IP rate limiter for collection write operations.
 * 30 requests per 15 minutes — generous enough for normal use,
 * tight enough to prevent bulk-create/scrape abuse.
 */
const collectionWriteLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 30,
  blockTimeMs: 15 * 60 * 1000,
  keyPrefix: "col_write",
  actionLabel: "collection write",
});

// Create a new collection
router.post("/", auth(...ALL_AUTH), collectionWriteLimiter, CollectionController.createCollection);

// Update collection metadata or story order
router.patch("/:id", auth(...ALL_AUTH), collectionWriteLimiter, CollectionController.updateCollection);

// Add a story to a collection
router.post(
  "/:id/stories",
  auth(...ALL_AUTH),
  collectionWriteLimiter,
  CollectionController.addStoryToCollection
);

// Remove a story from a collection
router.delete(
  "/:id/stories/:storyId",
  auth(...ALL_AUTH),
  collectionWriteLimiter,
  CollectionController.removeStoryFromCollection
);

// Delete a collection (soft-delete)
router.delete("/:id", auth(...ALL_AUTH), collectionWriteLimiter, CollectionController.deleteCollection);

// Get collection detail (public or owner) — read-only, no limiter needed
router.get("/:id", CollectionController.getCollectionById);

// List a user's collections — read-only, no limiter needed
router.get("/user/:userId", CollectionController.getUserCollections);

export const CollectionRouter = router;
