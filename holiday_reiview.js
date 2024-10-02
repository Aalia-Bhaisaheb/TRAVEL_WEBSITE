document.addEventListener('DOMContentLoaded', function() {
  const maxCount = 4;
  let rooms = [];
  const selectedGuestsElem = document.getElementById('selected-guests');
  const totalGuestsElem = document.createElement('div');
  totalGuestsElem.classList.add('total-guests');
  selectedGuestsElem.appendChild(totalGuestsElem);

  let adultCount = 1; // Starting with 1 adult
  let childCount = 0; // Starting with 0 children
  let roomNumber = 1;
  
  // Price variables
  const urlParams = new URLSearchParams(window.location.search);
  const pricePerPerson = parseFloat(urlParams.get('price')) || 0; // Fallback to 0 if not found
  const priceDisplay = document.getElementById('price-display');
  const totalPriceDisplay = document.getElementById('total-price-display');

  function updateCounts() {
      document.getElementById('count-adult').textContent = adultCount;
      document.getElementById('count-child').textContent = childCount;
  }

  function addRoom() {
      const roomDetail = document.createElement('div');
      roomDetail.className = 'room-detail';
      roomDetail.innerHTML = `<strong>ROOM ${roomNumber}</strong>: ${adultCount} Adults, ${childCount} Children`;
      selectedGuestsElem.appendChild(roomDetail);

      // Store room details
      rooms.push({ adults: adultCount, children: childCount });

      // Update total guests
      updateTotalGuests();

      roomNumber++;
      resetCounts();
  }

  function resetCounts() {
      adultCount = 1; // Reset to default
      childCount = 0;
      updateCounts();
      document.getElementById('room-label').textContent = `ROOM ${roomNumber}`;
  }

  function updateTotalGuests() {
      const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
      const totalChildren = rooms.reduce((sum, room) => sum + room.children, 0);
      const totalGuests = totalAdults + totalChildren;
      totalGuestsElem.textContent = `Total Guests: ${totalGuests}`;
      updateTotalPrice(totalGuests);
  }

  function updateTotalPrice(totalGuests) {
      const totalPrice = totalGuests * pricePerPerson;
      totalPriceDisplay.textContent = `Total Price: ₹${totalPrice.toFixed(2)}`; // Format total price
  }

  document.getElementById('increase-adult').addEventListener('click', function() {
      if (adultCount + childCount < maxCount) {
          adultCount++;
          updateCounts();
      }
  });

  document.getElementById('decrease-adult').addEventListener('click', function() {
      if (adultCount > 0) {
          adultCount--;
          updateCounts();
      }
  });

  document.getElementById('increase-child').addEventListener('click', function() {
      if (adultCount + childCount < maxCount) {
          childCount++;
          updateCounts();
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
  });

  document.getElementById('apply-details').addEventListener('click', function() {
      addRoom();
      const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal-guest'));
      if (modal) {
          modal.hide();
      }
  });

  // Initial price display
  if (pricePerPerson) {
      priceDisplay.textContent = `Price:₹${pricePerPerson.toFixed(2)} /-per person`;
      updateTotalPrice(1); // Initialize with one guest
  }

  // Email and mobile validation (remains unchanged)
  const emailInput = document.getElementById('exampleInputEmail1');
  const emailError = document.getElementById('emailError');
  const mobileInput = document.getElementById('exampleInputNumber');
  const noError = document.getElementById('noError');

  // Email validation pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Mobile number validation pattern (10 digits)
  const mobilePattern = /^\d{10}$/;

  function validateEmail() {
      if (!emailPattern.test(emailInput.value)) {
          emailError.style.display = 'block'; // Show error message
          return false;
      } else {
          emailError.style.display = 'none'; // Hide error message
          return true;
      }
  }

  function validateMobile() {
      if (!mobilePattern.test(mobileInput.value)) {
          noError.style.display = 'block'; // Show error message
          return false;
      } else {
          noError.style.display = 'none'; // Hide error message
          return true;
      }
  }

  emailInput.addEventListener('blur', function(e) {
      if (!validateEmail()) {
          e.preventDefault();
          emailInput.focus();
      }
  });
  
  mobileInput.addEventListener('blur', function(e) {
      if (!validateMobile()) {
          e.preventDefault();
          mobileInput.focus();
      }
  });
});
