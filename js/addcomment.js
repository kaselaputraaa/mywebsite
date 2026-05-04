function addComment() {
  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;

  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  comments.push({
    name: name,
    text: comment
  });

  localStorage.setItem("comments", JSON.stringify(comments));

  alert("Komentar berhasil dikirim!");

  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
}