INSERT IGNORE INTO post (ID, title, content, author, created_at)
VALUES
  (1, 'First Post', 'This is the content of the first post.', 'John Doe', '2025-02-24 10:00:00'),
  (2, 'Second Post', 'This is some longer content for the second post to test the text length. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.', 'Jane Smith', '2025-02-24 12:00:00'),
  (3, 'Third Post', 'Content for the third post.', 'Alice Johnson', '2025-02-24 14:00:00');
