const section = localStorage.getItem("profileSection") || "profile";
const content = document.getElementById("content");

loadSection(section);

function loadSection(section) {
  let html = "";

  // ===== PROFILE =====
  if (section === "profile") {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  html = `
    <div class="profile-box">
      <h2>Profile Details</h2>
      <hr>

      <div class="profile-row">
        <span>Full Name</span>
        <span>${user.name || "- not added -"}</span>
      </div>

      <div class="profile-row">
        <span>Mobile Number</span>
        <span>${user.phone || "- not added -"}</span>
      </div>

      <div class="profile-row">
        <span>Email ID</span>
        <span>${user.email || "- not added -"}</span>
      </div>

      <div class="profile-row">
        <span>Gender</span>
        <span>- not added -</span>
      </div>

      <div class="profile-row">
        <span>Date of Birth</span>
        <span>- not added -</span>
      </div>

      <div class="profile-row">
        <span>Location</span>
        <span>- not added -</span>
      </div>

      <div class="profile-row">
        <span>Alternate Mobile</span>
        <span>- not added -</span>
      </div>

      <div class="profile-row">
        <span>Hint Name</span>
        <span>- not added -</span>
      </div>

      <button class="edit-btn">EDIT</button>
    </div>
  `;
}
  // ===== ORDERS (UPDATED 🔥) =====
  else if (section === "orders") {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  html = "<h2>Orders</h2>";

  if (orders.length === 0) {
    html += "<p class='empty'>No orders yet</p>";
  } else {

    orders.forEach((order, i) => {

      html += `
        <div class="order-box">

          <div class="order-header" onclick="toggleOrder(${i})">
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Total:</strong> ${order.total}</p>
            <p><strong>City:</strong> ${order.address?.city || ""}</p>
            <span class="toggle">▼</span>
          </div>

          <div class="order-items hidden" id="order-${i}">
      `;

      order.items.forEach(item => {
        const title = item.name || item.title || "Item";

        html += `
          <div class="item-card">
            <img src="${item.image}" class="card-img">
            <div>
              <p><strong>${title}</strong></p>
              <p>₹${item.price}</p>
              <p>Qty: ${item.qty}</p>
            </div>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });
  }
}
  // ===== CART =====
  else if (section === "cart") {
    const data = JSON.parse(localStorage.getItem("cart")) || [];

    html = "<h2>Cart</h2>";

    if (data.length === 0) {
      html += `<p class="empty">Cart is empty</p>`;
    } else {
      data.forEach((item, index) => {
        const title = item.name || item.title || "Item";

        html += `
          <div class="card">
            <img src="${item.image || ''}" class="card-img">
            <div>
              <p><strong>${title}</strong></p>
              <p>₹${item.price || 0}</p>
            </div>

            <div class="actions">
              <button onclick="buyNow(${index})">Buy</button>
              <button onclick="removeItem('cart', ${index})">Remove</button>
            </div>
          </div>
        `;
      });
    }
  }

  // ===== WISHLIST =====
  else if (section === "wishlist") {
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];

    html = "<h2>Wishlist</h2>";

    if (data.length === 0) {
      html += `<p class="empty">No items in wishlist</p>`;
    } else {
      data.forEach((item, index) => {
        const title = item.name || item.title || "Item";

        html += `
          <div class="card">
            <img src="${item.image || ''}" class="card-img">
            <div>
              <p><strong>${title}</strong></p>
            </div>

            <div class="actions">
              <button onclick="moveToCart(${index})">Move to Cart</button>
              <button onclick="removeItem('wishlist', ${index})">Remove</button>
            </div>
          </div>
        `;
      });
    }
  }

  // ===== ADDRESS =====
else if (section === "address") {

  const address = JSON.parse(localStorage.getItem("address")) || {};

  html = `
    <h2>Saved Address</h2>

    <div class="card">
      <div>
        <p><strong>${address.name || "Name not added"}</strong></p>
        <p>${address.address || "Address not added"}</p>
        <p>${address.city || ""}, ${address.state || ""}</p>
        <p>${address.pincode || ""}</p>
        <p>Phone: ${address.phone || ""}</p>
      </div>
    </div>

    <button onclick="editAddress()">Edit Address</button>
  `;
}
  // ===== LESSONS =====
  else if (section === "lessons") {

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    html = "<h2>My Lessons</h2>";

    let lessonsFound = false;

    orders.forEach(order => {
      order.items.forEach(item => {

        if (item.type === "lesson") {
          lessonsFound = true;

          html += `
            <div class="card">
              <img src="${item.image || ''}" class="card-img">
              <div>
                <p><strong>${item.title}</strong></p>
                <p>₹${item.price}</p>
                <button onclick="watchLesson('${item.id}')">Watch Lesson</button>
              </div>
            </div>
          `;
        }

      });
    });

    if (!lessonsFound) {
      html += `<p class="empty">No lessons purchased</p>`;
    }
  }

  // ===== CONTACT =====
  else if (section === "contact") {
    html = `
      <h2>Contact</h2>
      <p>Email: support@riffstore.com</p>
      <p>Phone: +91 9876543210</p>
    `;
  }

  content.innerHTML = html;
}

/* ===== FUNCTIONS ===== */

function removeItem(type, index) {
  let data = JSON.parse(localStorage.getItem(type)) || [];
  data.splice(index, 1);
  localStorage.setItem(type, JSON.stringify(data));
  loadSection(type);
}

function moveToCart(index) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(wishlist[index]);
  wishlist.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  loadSection("wishlist");
}

function buyNow(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  const item = cart[index];

  const newOrder = {
    id: "ORD" + Date.now(),
    items: [item],
    total: "₹" + item.price,
    address: {}
  };

  orders.push(newOrder);
  cart.splice(index, 1);

  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.setItem("cart", JSON.stringify(cart));

  loadSection("cart");
}

function watchLesson(id) {
  alert("Opening lesson: " + id);
}

function toggleOrder(index) {
  const el = document.getElementById("order-" + index);
  el.classList.toggle("hidden");
}

function editAddress() {
  alert("Address edit feature coming next");
}