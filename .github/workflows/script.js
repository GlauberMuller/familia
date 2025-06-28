document.getElementById("checkin-form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const entries = Object.fromEntries(formData.entries());

  entries["dor"] = formData.get("dor") ? "Sim" : "Não";

  const values = [
    new Date().toLocaleString(), // Timestamp
    entries.familia,
    entries.genero,
    entries.inclusao_social,
    entries.humor,
    entries.estresse,
    entries.sono,
    entries.dor,
    entries.alimentacao,
    entries.atividade,
    entries.rede_apoio,
    entries.energia,
    entries.motivacao,
    entries.produtividade,
    entries.observacoes
  ];

  try {
    await fetch("https://script.google.com/macros/s/SEU_DEPLOY_URL/exec", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    const confirmation = document.getElementById("confirmation");
    confirmation.textContent = "✅ Check-in enviado com sucesso!";
    confirmation.classList.remove("hidden");
    confirmation.classList.add("success");
    form.reset();
  } catch (error) {
    alert("Erro ao enviar: " + error);
  }
});
