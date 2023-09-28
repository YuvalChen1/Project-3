export default function clearLocalStorage() {
  localStorage.removeItem("token")
  localStorage.removeItem("tokenExpiration")
  localStorage.removeItem("userEmail")
  localStorage.removeItem("userPassword")
  localStorage.removeItem("firstName")
  localStorage.removeItem("lastName")
}
