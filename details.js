document.addEventListener('DOMContentLoaded', function() {
  const maxCount = 4;
  let roomNumber = 1;
  const roomDetailsElem = document.getElementById('room-details');
  const roomLabelElem = document.getElementById('room-label');
  const countAdultElem = document.getElementById('count-adult');
  const countChildElem = document.getElementById('count-child');

  let adultCount = parseInt(countAdultElem.textContent);
  let childCount = parseInt(countChildElem.textContent);

  function updateCounts() {
      countAdultElem.textContent = adultCount;
      countChildElem.textContent = childCount;
  }

  function adjustCounts() {
      if (adultCount + childCount > maxCount) {
          if (adultCount > maxCount) {
              adultCount = maxCount;
              childCount = 0;
          } else {
              childCount = maxCount - adultCount;
          }
      }
      updateCounts();
  }

  function addRoom() {
      const roomDetail = document.createElement('div');
      roomDetail.className = 'room-detail';
      roomDetail.innerHTML = `<strong>ROOM ${roomNumber}</strong>: ${adultCount} Adults  ${childCount} Children`;
      roomDetailsElem.appendChild(roomDetail);
      roomNumber++;

      const modalContent = document.querySelector('.guest-content');
      modalContent.style.height = 'auto'; // Adjusts the height based on content
      modalContent.style.maxHeight = '90vh'; // Optional: set a max-height for better UX
      modalContent.style.overflowY = 'auto'; // Ensures
  }

  document.getElementById('increase-adult').addEventListener('click', function() {
      if (adultCount + childCount < maxCount) {
          adultCount++;
          adjustCounts();
      }
  });

  document.getElementById('decrease-adult').addEventListener('click', function() {
      if (adultCount > 0) {
          adultCount--;
          adjustCounts();
      }
  });

  document.getElementById('increase-child').addEventListener('click', function() {
      if (adultCount + childCount < maxCount) {
          childCount++;
          adjustCounts();
      }
  });

  document.getElementById('decrease-child').addEventListener('click', function() {
      if (childCount > 0) {
          childCount--;
          updateCounts();
      }
  });

  document.getElementById('add-room-button').addEventListener('click', function() {
      addRoom();
      roomLabelElem.textContent = `ROOM ${roomNumber}`;
      adultCount = 1; // Reset to default values if needed
      childCount = 0;
      updateCounts();
  });

  document.querySelector('.search-bar').addEventListener('click', function() {
      const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal-guest'));
      if (modal) {
          modal.hide();
      }
  });
});
