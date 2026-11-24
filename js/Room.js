let editRoomIndex = -1;
const roomFields = ["roomId", "roomNumber", "category", "price", "capacity"];

function renderRooms() {
  let keyword = document.getElementById("roomSearch").value;
  let categoryFilter = document.getElementById("roomCategoryFilter").value;
  let statusFilter = document.getElementById("roomStatusFilter").value;

  let rows = "";
  let shown = 0;

  for (let i = 0; i < rooms.length; i++) {
    let room = rooms[i];

    let matchesCategory = (categoryFilter === "All" || room.category === categoryFilter);
    let matchesStatus = (statusFilter === "All" || room.status === statusFilter);

    if (matchesCategory && matchesStatus) {
      let statusColor;
      switch (room.status) {
        case "Available":
          statusColor = "green";
          break;
        case "Booked":
          statusColor = "orange";
          break;
        default:
          statusColor = "red";
      }

      rows += "<tr>" +
        "<td>" + room.id + "</td>" +
        "<td>" + room.number + "</td>" +
        "<td>" + room.category + "</td>" +
        "<td>" + room.price + "</td>" +
        "<td>" + room.capacity + " Person(s)</td>" +
        "<td><span class='badge " + statusColor + "'>" + room.status + "</span></td>" +
        "<td>" +
        "<button type='button' class='btn btn-small' onclick='editRoom(" + i + ")'>Edit</button>" +
        "<button type='button' class='btn btn-small btn-danger' onclick='deleteRoom(" + i + ")'>Delete</button>" +
        "</td>" +
        "</tr>";
      shown++;
    }
  }

  if (shown === 0) {
    rows = "<tr><td colspan='7' class='empty-row'>No rooms match your search.</td></tr>";
  }

  document.getElementById("roomTableBody").innerHTML = rows;
  document.getElementById("roomCount").innerHTML = "Showing " + shown + " of " + rooms.length + " rooms";
}

function saveRoom() {
  let roomId = document.getElementById("roomId").value.trim().toUpperCase();
  let roomNumber = document.getElementById("roomNumber").value.trim();
  let category = document.getElementById("category").value;
  let priceText = document.getElementById("price").value;
  let capacityText = document.getElementById("capacity").value;
  let status = document.getElementById("roomStatus").value;

  let price = Number(priceText);
  let capacity = Number(capacityText);

  let isValid = true;
  clearErrors(roomFields);

  if (isEmpty(roomId)) {
    showError("roomId", "Room ID is required (e.g. R-005).");
    isValid = false;
  }

  if (isDigitsOnly(roomNumber) === false || roomNumber.length < 3) {
    showError("roomNumber", "Room number must be at least 3 digits.");
    isValid = false;
  } else if (roomNumberUsedByOther(roomNumber)) {
    showError("roomNumber", "Another room already has this number.");
    isValid = false;
  }

  if (category === "") {
    showError("category", "Please choose a category.");
    isValid = false;
  }

  if (priceText === "" || price < 500 || price > 50000) {
    showError("price", "Price must be between 500 and 50000 Tk.");
    isValid = false;
  }

  if (capacityText === "" || capacity < 1 || capacity > 10) {
    showError("capacity", "Capacity must be between 1 and 10.");
    isValid = false;
  }

  if (isValid === false) {
    showMessage("roomMessage", "Please fix the fields marked in red.", "error");
    return false;
  }

  if (editRoomIndex === -1) {
    let newRoom = { id: roomId, number: roomNumber, category: category, price: price, capacity: capacity, status: status };
    rooms.push(newRoom);
    showMessage("roomMessage", "Room <strong>" + roomNumber + "</strong> was added with id " + newRoom.id + ".", "success");
  } else {
    let room = rooms[editRoomIndex];
    room.id = roomId;
    room.number = roomNumber;
    room.category = category;
    room.price = price;
    room.capacity = capacity;
    room.status = status;
    showMessage("roomMessage", "Room <strong>" + roomNumber + "</strong> was updated.", "success");
  }

  resetRoomForm();
  renderRooms();
  return false;
}

function roomNumberUsedByOther(number) {
  for (let i = 0; i < rooms.length; i++) {
    if (i !== editRoomIndex && rooms[i].number === number) {
      return true;
    }
  }
  return false;
}

function editRoom(index) {
  let room = rooms[index];
  editRoomIndex = index;

  document.getElementById("roomId").value = room.id;
  document.getElementById("roomNumber").value = room.number;
  document.getElementById("category").value = room.category;
  document.getElementById("price").value = room.price;
  document.getElementById("capacity").value = room.capacity;
  document.getElementById("roomStatus").value = room.status;

  document.getElementById("roomFormTitle").innerHTML = "Edit Room " + room.id;
  document.getElementById("roomSaveButton").value = "Update Room";
  hideMessage("roomMessage");
}

function deleteRoom(index) {
  let room = rooms[index];
  if (room.status === "Booked") {
    showMessage("roomMessage", "Room <strong>" + room.number + "</strong> cannot be deleted while booked.", "error");
    return;
  }

  rooms = removeAt(rooms, index);
  showMessage("roomMessage", "Room <strong>" + room.number + "</strong> was deleted.", "info");
  resetRoomForm();
  renderRooms();
}

function resetRoomForm() {
  editRoomIndex = -1;
  document.getElementById("roomForm").reset();
  clearErrors(roomFields);
  document.getElementById("roomFormTitle").innerHTML = "Add New Room";
  document.getElementById("roomSaveButton").value = "Add Room";
}

renderRooms();
