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
        // Add room details to selected guests
        addRoom();

        // Hide the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal-guest'));
        if (modal) {
            modal.hide();
        }
    });
});
