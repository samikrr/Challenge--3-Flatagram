document.addEventListener('DOMContentLoaded', () => {
    const titleElement = document.getElementById('card-title');
    const imageElement = document.getElementById('image');
    const likesElement = document.getElementById('likes');
    const likeButton = document.getElementById('like-btn');
    const commentsList = document.getElementById('comments-list');
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');

    // Fetch image and comments data
    fetch('/images/1')
        .then(response => response.json())
        .then(data => {
            titleElement.textContent = data.title;
            imageElement.src = data.image;
            likesElement.textContent = data.likes;

            // Render comments
            data.comments.forEach(comment => {
                const li = document.createElement('li');
                li.classList.add('comment-item');
                li.textContent = comment.content;
                commentsList.appendChild(li);
            });
        });

    // Like button event
    likeButton.addEventListener('click', () => {
        let likes = parseInt(likesElement.textContent, 10);
        likes++;
        likesElement.textContent = likes;
    });

    // Comment form submit event
    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const commentContent = commentInput.value;

        if (commentContent.trim() !== '') {
            const li = document.createElement('li');
            li.classList.add('comment-item');
            li.textContent = commentContent;
            commentsList.appendChild(li);

            // Clear comment input
            commentInput.value = '';
        }
    });

    // Bonus: Comment deletion (Extra Bonus #2)
    commentsList.addEventListener('click', (event) => {
        if (event.target && event.target.tagName === 'LI') {
            event.target.remove();
        }
    });

    // Bonus: Toggle image display (Bonus #2)
    titleElement.addEventListener('click', () => {
        imageElement.classList.toggle('hidden');
    });

    // Bonus: Random dog image (Bonus #3)
    imageElement.addEventListener('click', () => {
        fetch('https://dog.ceo/api/breeds/image/random')
            .then(response => response.json())
            .then(data => {
                imageElement.src = data.message;

                // Update image on the server (Extra Bonus #3)
                fetch('/images/1', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        image: data.message,
                    }),
                });
            });
    });
});

            