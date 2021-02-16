// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
  if (event) {
    console.info('DOM loaded');
  }

  // UPDATE
  const changeDevourBtn = document.querySelectorAll('.change-devoured');

  

  // Set up the event listener for the create button
  if (changeDevourBtn) {
    changeDevourBtn.forEach((button) => {
      button.addEventListener('click', (e) => {
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute('data-id');
        const newBurger = e.target.getAttribute('data-newBurger');
        const newBurgerState = {
          devoured: newBurger,
        };
       

        fetch(`/api/burgers/${id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          // make sure to serialize the JSON body
          body: JSON.stringify(newBurgerState),
        })
        .then((response) => {
     
          // Check that the response is all good
          // Reload the page so the user can see the new quote
          if (response.ok) {            
            location.reload('/');

          } else {
            alert('something went wrong!');
          }
        });
        
      });
    
    });
    
  }
  

  // CREATE
  const createBgrBtn = document.getElementById('create-form');

  if (createBgrBtn) {
    createBgrBtn.addEventListener('submit', (e) => {
      e.preventDefault();

      // Grabs the value of the textarea that goes by the name, "quote"
      const newBurger = {
        name: document.getElementById('ca').value.trim(),
        devoured: document.getElementById('devoured').checked,
      };

      // Send POST request to create a new quote
      fetch('/api/burgers', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        // make sure to serialize the JSON body
        body: JSON.stringify(newBurger),
      }).then(() => {
        // Empty the form
        document.getElementById('ca').value = '';

        // Reload the page so the user can see the new quote
        location.reload();
      });
    });
  }

  // DELETE
  const deleteBurgerBtn = document.querySelectorAll('.delete-burger');

  // Set up the event listeners for each delete button
  deleteBurgerBtn.forEach((button) => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');

      // Send the delete request
      fetch(`/api/burgers/${id}`, {
        method: 'DELETE',
      }).then((res) => {
        console.log(`Deleted burger: ${id}`);

        // Reload the page
        location.reload();
      });
    });
  });
});
