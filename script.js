function generarImagenes() {
    const tabla = document.querySelector("#dataTable tbody");//Datos Jugadores
    const utabla = document.querySelector("#userTable tbody");//Datos vendedor
    const filas = tabla.querySelectorAll("tr");
    const ufilas = utabla.querySelectorAll("tr");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const contenedor = document.getElementById("imagenes");
    contenedor.innerHTML = "";
  
    function drawRoundedRect(ctx, x, y, width, height, radius) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    }
  
    function formatearConPuntos(valor) {
      const num = parseInt(valor.replace(/\D/g, ""), 10);
      if (isNaN(num)) return "";
      return num.toLocaleString('de-DE');
    }
  
    // const imagenSuperior = new Image();
    // const imagenInferior = new Image();
    // let cargadas = 0;
  
    // imagenSuperior.onload = imagenInferior.onload = () => {
    //   cargadas++;
    //   if (cargadas === 2) {
    //     document.fonts.load("700 80px 'Gilroy'").then(() => {
    //       procesarTabla();
    //     });
    //   }    
    // };
  
    // imagenSuperior.onerror = () => alert("No se pudo cargar superior.png");
    // imagenInferior.onerror = () => alert("No se pudo cargar inferior.png");
  
    // imagenSuperior.src = "superior.jpeg";
    // imagenInferior.src = "inferior.jpeg";
  
    function procesarTabla() {
      function getX(colIdx) {
        return margenLateral + celdaAnchos.slice(0, colIdx).reduce((sum, w) => sum + w, 0);
      }
      
      const etiquetas = [
        "Name", "Position",  "Alt Position","Age", "Rating", "Potential",
        "Fav. Opp.", "Worst Opp.", "Fav. Mindset", "Worst Mindset",
        "Formation", "Price"
      ];

      const datos = [];
      const udatos = [];
      //Table Jugadores
      filas.forEach((fila) => {
        const celdas = fila.querySelectorAll("td");
        const valores = Array.from(celdas).map((celda) => {
          const input = celda.querySelector("input");
          const select = celda.querySelector("select");
          if (input) {
            return input.value.trim();
          } else if (select) {
            const selected = Array.from(select.selectedOptions).map(opt => opt.value.trim());
            return select.multiple ? selected.join(", ") : selected[0];
          } else {
            return "";
          }
        });
        if (!valores[0] || valores[0].trim() === "") return;
        datos.push(valores);
      });
      //Tabla vendedor
      ufilas.forEach((ufila) => {
        const uceldas = ufila.querySelectorAll("td");
        const uvalores = Array.from(uceldas).map((ucelda) => {
          const uinput = ucelda.querySelector("input");
          const uselect = ucelda.querySelector("select");
          if (uinput) {
            return uinput.value.trim();
          } else if (uselect) {
            const uselected = Array.from(uselect.selectedOptions).map(opt => opt.value.trim());
            return uselect.multiple ? uselected.join(", ") : uselected[0];
          } else {
            return "";
          }
        });
        if (!uvalores[0] || uvalores[0].trim() === "") return;
        udatos.push(uvalores);
        //alert(udatos);
      });
  
      if (datos.length === 0) {
        alert("You have to add at least one player!");
        return;
      }
      if (udatos.length === 0) {
        alert("You have to add the Discord user!");
        //alert(udatos);
        return;
      }      
  
      ctx.font = "16px 'Gilroy'";
      const lineHeight = 20;
      const margenLateral = 10;
  
      const celdaAnchos = etiquetas.map((etiqueta, colIdx) => {
        const textos = datos.map(fila => fila[colIdx]).concat(etiqueta);
        return Math.ceil(Math.max(...textos.map(t => ctx.measureText(t).width)) + 5);
      });
  
      const filaAltos = datos.map(fila => {
        const alturas = fila.map(valor => {
          const lineas = valor.split(',').map(l => l.trim());
          return lineas.length * lineHeight;
        });
        return Math.max(...alturas, lineHeight);
      });
  
      const altoCabecera = 30;
      const altoTabla = altoCabecera + filaAltos.reduce((acc, h) => acc + h + margenLateral, 0);
      const anchoTabla = celdaAnchos.reduce((sum, w) => sum + w, 0) + margenLateral * 2;
      const alturaCanvas = 50 + altoTabla + 130;
  
      canvas.width = anchoTabla;
      canvas.height = alturaCanvas;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      ctx.fillStyle = "#f9a825";
      drawRoundedRect(ctx, 0, 0, canvas.width, canvas.height, 24);
      ctx.fill();
  
      ctx.fillStyle = "#000000";
      ctx.font = "bolder 80px 'Gilroy'";
      const OperationType = udatos[0][2];
      ctx.fillText(OperationType.toUpperCase(), 20, 70);
      ctx.font = "700 30px 'Gilroy'";
      //const sellerTeam = "Porto";
      const sellerTeam = udatos[0][1];
      ctx.fillText("Team: "+sellerTeam, canvas.width / 2 - sellerTeam.length*4, 50);
      ctx.font = "700 20px 'Gilroy'";
      //const sellerUser = "@cridas";
      const sellerUser = udatos[0][0];
      ctx.fillText("contact: "+sellerUser, canvas.width / 2 - sellerUser.length*4, 80);
      ctx.font = "10px 'Gilroy'";
      ctx.fillText("generado por @cridas", canvas.width - 180, canvas.height - 20);
  
      const yCabecera = 90;
      ctx.fillStyle = "#f0f0f0";
      drawRoundedRect(ctx, margenLateral, yCabecera, anchoTabla - margenLateral * 2, altoCabecera, 12);
      ctx.fill();
      ctx.font = "12px 'Gilroy'";

      let x = margenLateral;
      ctx.fillStyle = "#000";
      etiquetas.forEach((titulo, i) => {
        const ancho = celdaAnchos[i];
        const x = getX(i);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(titulo, x + ancho / 2, yCabecera + altoCabecera / 2);
      });

  
      let y = yCabecera + altoCabecera + margenLateral;
  
      datos.forEach((fila, filaIdx) => {
        const altoFila = filaAltos[filaIdx];
        x = margenLateral;
        ctx.fillStyle = "#ffffff";
        drawRoundedRect(ctx, x, y, anchoTabla - margenLateral * 2, altoFila, 12);
        ctx.fill();
        //ctx.stroke();
  
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";     // centra horizontalmente
        ctx.textBaseline = "middle"; // centra verticalmente

        fila.forEach((dato, colIdx) => {
          const ancho = celdaAnchos[colIdx];
          const x = getX(colIdx);
          const lineas = dato.split(',').map(l => l.trim());
          const totalTextHeight = lineas.length * lineHeight;
          const yStart = y + (altoFila - totalTextHeight) / 2;
        
          lineas.forEach((linea, lineaIdx) => {
            ctx.fillText(linea, x + ancho / 2, yStart + lineaIdx * lineHeight + lineHeight / 2);
          });
        });
  
        y += altoFila + margenLateral;
      });
  
      const img = new Image();
      img.src = canvas.toDataURL();
      contenedor.appendChild(img);
      document.getElementById("PostProceso").style.display = "block";

    }
  }
  
  document.querySelectorAll("#dataTable tbody tr").forEach(fila => {
    const nameInput = fila.querySelector("td:nth-child(1) input");
    const priceInput = fila.querySelector("td:nth-child(12) input");
  
    nameInput.addEventListener("input", () => {
      nameInput.value = nameInput.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    });
  
    priceInput.addEventListener("input", () => {
      const soloNumeros = priceInput.value.replace(/\D/g, "");
      const numero = parseInt(soloNumeros, 10);
      if (!isNaN(numero)) {
        priceInput.value = numero.toLocaleString("de-DE");
      } else {
        priceInput.value = "";
      }
    });
  });
  // Botón Exportar CSV
document.getElementById("btnExportCSV").addEventListener("click", () => {
  const tabla = document.querySelector("#dataTable tbody");
  const filas = tabla.querySelectorAll("tr");
  let csv = [];

  filas.forEach((fila) => {
    const celdas = fila.querySelectorAll("td");
    const filaDatos = Array.from(celdas).map((celda) => {
      const input = celda.querySelector("input");
      const select = celda.querySelector("select");
      if (input) return `"${input.value}"`;
      if (select) {
        const seleccion = Array.from(select.selectedOptions).map(opt => opt.value.trim());
        return `"${seleccion.join(",")}"`;
      }
      return '""';
    });
    if (filaDatos.some(d => d !== '""')) csv.push(filaDatos.join(","));
  });

  const csvBlob = new Blob([csv.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(csvBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "jugadores.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

// Botón Importar CSV
document.getElementById("btnImportCSV").addEventListener("click", () => {
  document.getElementById("inputCSV").click();
});

document.getElementById("inputCSV").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const lineas = event.target.result.split(/\r?\n/).filter(l => l.trim() !== "");
    const tabla = document.querySelector("#dataTable tbody");
    const filas = tabla.querySelectorAll("tr");

    lineas.forEach((linea, idx) => {
      if (idx >= filas.length) return;
      const valores = linea.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.replace(/^"|"$/g, ""));
      const celdas = filas[idx].querySelectorAll("td");

      valores.forEach((valor, colIdx) => {
        const input = celdas[colIdx].querySelector("input");
        const select = celdas[colIdx].querySelector("select");
        if (input) input.value = valor;
        if (select) {
          const opciones = valor.split(",");
          Array.from(select.options).forEach(opt => {
            opt.selected = opciones.includes(opt.value);
          });
        }
      });
    });
  };
  reader.readAsText(file);
});
//Copiar img
document.getElementById("copiarImagen").addEventListener("click", async () => {
  const canvas = document.getElementById("canvas");
  try {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        alert("No se pudo copiar la imagen.");
        return;
      }
      const item = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([item]);
      alert("Imagen copiada al portapapeles.");
    });
  } catch (err) {
    alert("Error al copiar la imagen: " + err);
  }
});
//Descarga img
document.getElementById("descargarImagen").addEventListener("click", () => {
  const canvas = document.getElementById("canvas");
  const link = document.createElement("a");
  link.download = "playerlist.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
