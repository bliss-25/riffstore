document.addEventListener("DOMContentLoaded", () => {
console.log("SUCCESS PAGE LOADED");
  // ===============================
  // GET CART
  // ===============================
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // 🔥 BACKUP CART (IMPORTANT FIX)
  let cartBackup = [...cart];

  // ===============================
  // GET EXISTING ORDERS
  // ===============================
  let orders = JSON.parse(localStorage.getItem("orders") || "[]");

  // ===============================
  // CREATE ORDER (ONLY IF CART EXISTS)
  // ===============================
  if (cart.length > 0) {

    let newOrder = {
      id: "ORD" + Date.now(),
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }),
      items: cart,
      total: cart.reduce((sum, item) => sum + (item.price * item.qty), 0),
      status: "Success"
    };

    // ✅ SAVE ORDER
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    // ✅ SAVE COURSES (USE BACKUP)
    saveCoursesFromCart(cartBackup);

    // ✅ CLEAR CART
    localStorage.removeItem("cart");
  }

  // ===============================
  // SHOW LAST ORDER
  // ===============================
  if (orders.length === 0) return;

  const lastOrder = orders[orders.length - 1];

  document.getElementById("orderId").textContent = lastOrder.id;
  document.getElementById("orderTotal").textContent = "₹" + lastOrder.total;
  document.getElementById("orderDate").textContent = lastOrder.date;

});


// ===============================
// SAVE COURSES (LESSONS)
// ===============================
function saveCoursesFromCart(cart = []) {

  if (!cart.length) return;

  let courses = JSON.parse(localStorage.getItem("courses") || "[]");

  cart.forEach(item => {

    // 🔥 DETECT LESSON WITHOUT type
    if (
      item.title &&
      (
        item.title.toLowerCase().includes("course") ||
        item.title.toLowerCase().includes("lesson")
      )
    ) {

      let exists = courses.find(c => c.title === item.title);

      if (!exists) {
        courses.push({
          title: item.title,
          image: item.image,
          progress: 0,
          totalLessons: item.totalLessons || 10,
          instructor: item.instructor || "Instructor"
        });
      }
    }
  });

  localStorage.setItem("courses", JSON.stringify(courses));
}


// ===============================
// GO HOME
// ===============================
function goHome() {
  window.location.href = "../index.html";
}