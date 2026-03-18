function summarizeText() {

    let text = document.getElementById("inputText").value;
    let output = document.getElementById("summary");

    if (text.trim() === "") {
        output.innerHTML = "Please enter some text!";
        return;
    }

    output.innerHTML = "Generating summary...";

    // Try backend (Flask)
    fetch("/summarize", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "text=" + encodeURIComponent(text)
    })
    .then(response => response.json())
    .then(data => {
        output.innerHTML = data.summary;
    })
    .catch(() => {
        // 👉 Fallback (GitHub Pages)
        let summary = text.split(" ").slice(0, 20).join(" ") + "...";
        output.innerHTML = summary + " (Demo Mode)";
    });
}


function countCharacters() {
    let text = document.getElementById("inputText").value;
    document.getElementById("count").innerHTML = text.length + " Characters";
}

function copyText() {
    let text = document.getElementById("summary").innerText;
    navigator.clipboard.writeText(text);
    alert("Summary copied!");
}

function clearText() {
    document.getElementById("inputText").value = "";
    document.getElementById("summary").innerHTML = "";
    document.getElementById("count").innerHTML = "0 Characters";
}