// DOM Elements
const contactForm = document.getElementById("contact-form")
const contactsList = document.getElementById("contacts-list")
const emptyState = document.getElementById("empty-state")
const editModal = document.getElementById("edit-modal")
const editForm = document.getElementById("edit-form")
const deleteModal = document.getElementById("delete-modal")
const confirmDeleteBtn = document.getElementById("confirm-delete")
const cancelDeleteBtn = document.getElementById("cancel-delete")
const closeButton = document.querySelector(".close-button")

// Current contact being edited or deleted
let currentContactId = null

// Load contacts from localStorage
function loadContacts() {
  const contacts = getContactsFromStorage()
  renderContacts(contacts)
}

// Get contacts from localStorage
function getContactsFromStorage() {
  const contacts = localStorage.getItem("contacts")
  return contacts ? JSON.parse(contacts) : []
}

// Save contacts to localStorage
function saveContactsToStorage(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts))
}

// Render contacts list
function renderContacts(contacts) {
  // Clear the contacts list except for the empty state
  const children = Array.from(contactsList.children)
  children.forEach((child) => {
    if (child.id !== "empty-state") {
      contactsList.removeChild(child)
    }
  })

  // Show or hide empty state
  if (contacts.length === 0) {
    emptyState.style.display = "block"
    return
  } else {
    emptyState.style.display = "none"
  }

  // Render each contact
  contacts.forEach((contact) => {
    const contactCard = document.createElement("div")
    contactCard.className = "contact-card"
    contactCard.dataset.id = contact.id

    contactCard.innerHTML = `
      <div class="contact-header">
        <div class="contact-name">${contact.name}</div>
        <div class="contact-actions">
          <button class="btn btn-secondary btn-icon edit-btn" title="Edit">✏️</button>
          <button class="btn btn-danger btn-icon delete-btn" title="Delete">🗑️</button>
        </div>
      </div>
      <div class="contact-info">
        <div class="contact-detail">
          <span>📧</span>
          <span>${contact.email}</span>
        </div>
        <div class="contact-detail">
          <span>📱</span>
          <span>${contact.phone}</span>
        </div>
      </div>
    `

    // Add event listeners to edit and delete buttons
    const editBtn = contactCard.querySelector(".edit-btn")
    const deleteBtn = contactCard.querySelector(".delete-btn")

    editBtn.addEventListener("click", () => openEditModal(contact))
    deleteBtn.addEventListener("click", () => openDeleteModal(contact.id))

    contactsList.appendChild(contactCard)
  })
}

// Validate form
function validateForm(nameInput, emailInput, phoneInput, nameError, emailError, phoneError) {
  let isValid = true

  // Reset error messages
  nameError.textContent = ""
  emailError.textContent = ""
  phoneError.textContent = ""

  // Validate name
  if (!nameInput.value.trim()) {
    nameError.textContent = "Name is required"
    isValid = false
  }

  // Validate email
  if (!emailInput.value.trim()) {
    emailError.textContent = "Email is required"
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
    emailError.textContent = "Email is invalid"
    isValid = false
  }

  // Validate phone
  if (!phoneInput.value.trim()) {
    phoneError.textContent = "Phone is required"
    isValid = false
  }

  return isValid
}

// Add new contact
function addContact(event) {
  event.preventDefault()

  const nameInput = document.getElementById("name")
  const emailInput = document.getElementById("email")
  const phoneInput = document.getElementById("phone")
  const nameError = document.getElementById("name-error")
  const emailError = document.getElementById("email-error")
  const phoneError = document.getElementById("phone-error")

  // Validate form
  if (!validateForm(nameInput, emailInput, phoneInput, nameError, emailError, phoneError)) {
    return
  }

  // Create new contact object
  const newContact = {
    id: Date.now().toString(),
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
  }

  // Get existing contacts
  const contacts = getContactsFromStorage()

  // Add new contact
  contacts.push(newContact)

  // Save to localStorage
  saveContactsToStorage(contacts)

  // Render updated contacts
  renderContacts(contacts)

  // Reset form
  contactForm.reset()
}

// Open edit modal
function openEditModal(contact) {
  // Set current contact ID
  currentContactId = contact.id

  // Fill form with contact data
  document.getElementById("edit-id").value = contact.id
  document.getElementById("edit-name").value = contact.name
  document.getElementById("edit-email").value = contact.email
  document.getElementById("edit-phone").value = contact.phone

  // Show modal
  editModal.style.display = "flex"
}

// Update contact
function updateContact(event) {
  event.preventDefault()

  const idInput = document.getElementById("edit-id")
  const nameInput = document.getElementById("edit-name")
  const emailInput = document.getElementById("edit-email")
  const phoneInput = document.getElementById("edit-phone")
  const nameError = document.getElementById("edit-name-error")
  const emailError = document.getElementById("edit-email-error")
  const phoneError = document.getElementById("edit-phone-error")

  // Validate form
  if (!validateForm(nameInput, emailInput, phoneInput, nameError, emailError, phoneError)) {
    return
  }

  // Get existing contacts
  const contacts = getContactsFromStorage()

  // Find and update the contact
  const updatedContacts = contacts.map((contact) => {
    if (contact.id === idInput.value) {
      return {
        ...contact,
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
      }
    }
    return contact
  })

  // Save to localStorage
  saveContactsToStorage(updatedContacts)

  // Render updated contacts
  renderContacts(updatedContacts)

  // Close modal
  closeEditModal()
}

// Close edit modal
function closeEditModal() {
  editModal.style.display = "none"
  editForm.reset()
  currentContactId = null
}

// Open delete modal
function openDeleteModal(id) {
  currentContactId = id
  deleteModal.style.display = "flex"
}

// Delete contact
function deleteContact() {
  if (!currentContactId) return

  // Get existing contacts
  const contacts = getContactsFromStorage()

  // Filter out the contact to delete
  const updatedContacts = contacts.filter((contact) => contact.id !== currentContactId)

  // Save to localStorage
  saveContactsToStorage(updatedContacts)

  // Render updated contacts
  renderContacts(updatedContacts)

  // Close modal
  closeDeleteModal()
}

// Close delete modal
function closeDeleteModal() {
  deleteModal.style.display = "none"
  currentContactId = null
}

// Event Listeners
document.addEventListener("DOMContentLoaded", loadContacts)
contactForm.addEventListener("submit", addContact)
editForm.addEventListener("submit", updateContact)
confirmDeleteBtn.addEventListener("click", deleteContact)
cancelDeleteBtn.addEventListener("click", closeDeleteModal)
closeButton.addEventListener("click", closeEditModal)

// Close modals when clicking outside
window.addEventListener("click", (event) => {
  if (event.target === editModal) {
    closeEditModal()
  }
  if (event.target === deleteModal) {
    closeDeleteModal()
  }
})

