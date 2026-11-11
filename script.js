// =======================================
// BLOOM & BLUSH
// BLOG PERSONAL DE MAQUILLAJE
// =======================================

// =======================================
// 1. CATEGORÍAS DE MAQUILLAJE
// =======================================

const categorias = [
  {
    id: "labiales",
    nombre: "Labiales",
    icono: "💄",
    descripcion: "Mis labiales favoritos, desde mate hasta gloss y lip oils.",
    filtros: {
      gama: ["Económico", "Gama media", "Alta gama"],
      acabado: ["Mate", "Gloss", "Lip oil"]
    }
  },
  {
    id: "bases",
    nombre: "Bases de maquillaje",
    icono: "🧴",
    descripcion: "Mis bases favoritas según el acabado y tipo de piel.",
    filtros: {
      gama: ["Económico", "Gama media", "Alta gama"],
      acabado: ["Mate", "Glow"],
      piel: [
        "Con tendencia a acné",
        "Seca",
        "Grasa",
        "Mixta"
      ]
    }
  },
  {
    id: "rubores",
    nombre: "Rubores",
    icono: "🌸",
    descripcion: "Mis rubores líquidos y en polvo favoritos.",
    filtros: {
      gama: ["Económico", "Gama media", "Alta gama"],
      formato: ["Líquido", "Polvo"],
      comedogenicidad: [
        "Comedogénico",
        "No comedogénico",
        "Sin evaluar"
      ],
      pigmentacion: ["Alta", "Baja"],
      cobertura: ["Alta", "Media", "Baja"]
    }
  },
  {
    id: "correctores",
    nombre: "Correctores",
    icono: "✨",
    descripcion: "Mis correctores favoritos para diferentes tipos de piel.",
    filtros: {
      gama: ["Económico", "Gama media", "Alta gama"],
      piel: ["Seca", "Grasa", "Mixta"],
      comedogenicidad: [
        "Comedogénico",
        "No comedogénico",
        "Sin evaluar"
      ],
      cobertura: ["Alta", "Media", "Baja"]
    }
  },
  {
    id: "iluminadores",
    nombre: "Iluminadores",
    icono: "💎",
    descripcion: "Mis iluminadores económicos y de alta gama.",
    filtros: {
      gama: ["Económico", "Gama media", "Alta gama"]
    }
  },
  {
    id: "polvos",
    nombre: "Polvos de maquillaje",
    icono: "🪞",
    descripcion: "Mis polvos compactos y sueltos favoritos.",
    filtros: {
      gama: ["Económico", "Gama media", "Alta gama"],
      formato: ["Compacto", "Suelto"],
      piel: ["Seca", "Grasa", "Mixta"]
    }
  },
  {
    id: "mascaras",
    nombre: "Máscaras de pestañas",
    icono: "👁️",
    descripcion: "Mis máscaras favoritas según su duración y resistencia.",
    filtros: {
      gama: ["Económico", "Gama media", "Alta gama"],
      duracion: ["Larga duración", "Baja duración"],
      resistencia: [
        "Resistente al agua",
        "Sin resistencia al agua"
      ]
    }
  }
];

const nombresFiltros = {
  gama: "Precio",
  acabado: "Acabado",
  piel: "Tipo de piel",
  formato: "Presentación",
  comedogenicidad: "Comedogenicidad",
  pigmentacion: "Pigmentación",
  cobertura: "Cobertura",
  duracion: "Duración",
  resistencia: "Resistencia al agua"
};


// =======================================
// 2. MIS TOPS PERSONALES
// =======================================

// AQUÍ COLOCAREMOS TUS PRODUCTOS.
//
// Cada categoría empieza vacía.
// No existe ningún formulario público
// para agregar o modificar tus tops.
//
// El orden de los productos en cada
// lista determina Top #1, Top #2, etc.
//
// Este es un EJEMPLO COMENTADO.
// No se mostrará en la página:
//
// {
//   id: "labial-01",
//   nombre: "Nombre del producto",
//   marca: "Nombre de la marca",
//   foto: "imagenes/labial.jpg",
//   gama: "Alta gama",
//   atributos: {
//     acabado: "Gloss"
//   },
//   opinion: "Mi opinión personal del producto."
// }
//
// Mantén el mismo id de cada producto
// una vez publicado para conservar
// sus comentarios asociados.

const misTops = {

  // LABIALES
  labiales: [

  ],

  // BASES DE MAQUILLAJE
  bases: [

  ],

  // RUBORES
  rubores: [

  ],

  // CORRECTORES
  correctores: [

  ],

  // ILUMINADORES
  iluminadores: [

  ],

  // POLVOS
  polvos: [

  ],

  // MÁSCARAS DE PESTAÑAS
  mascaras: [

  ]

};


// =======================================
// 3. CONFIGURACIÓN DE COMENTARIOS
// =======================================

// Los comentarios públicos necesitan
// una base de datos.
//
// Más adelante colocarás aquí los
// datos de tu proyecto Firebase.
//
// Mientras esté vacío, la página
// funcionará y mostrará los tops,
// pero no permitirá publicar comentarios.

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  appId: ""
};

let conexion = null;
const escuchas = {};


// =======================================
// 4. FUNCIONES AUXILIARES
// =======================================

function escapar(texto) {
  return String(texto ?? "").replace(
    /[&<>"']/g,
    caracter => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[caracter]
  );
}

function idComentario(categoria, producto) {
  return categoria + "_" + producto;
}


// =======================================
// 5. CREAR MENÚ DE CATEGORÍAS
// =======================================

function crearMenu() {
  const menu = document.getElementById(
    "menu-categorias"
  );

  menu.innerHTML = categorias.map(cat => `
    <a href="#${cat.id}" class="boton-categoria">
      ${cat.icono} ${cat.nombre}
    </a>
  `).join("");
}


// =======================================
// 6. CREAR FILTROS
// =======================================

function crearFiltros(cat) {
  return Object.entries(cat.filtros).map(
    ([clave, opciones]) => `

    <div class="grupo-filtro">
      <label for="filtro-${cat.id}-${clave}">
        ${nombresFiltros[clave]}
      </label>

      <select
        id="filtro-${cat.id}-${clave}"
        data-atributo="${clave}">

        <option value="">Todos</option>

        ${opciones.map(opcion => `
          <option value="${escapar(opcion)}">
            ${escapar(opcion)}
          </option>
        `).join("")}

      </select>
    </div>

  `).join("");
}


// =======================================
// 7. CREAR LAS SIETE SECCIONES
// =======================================

function crearSecciones() {
  const contenedor = document.getElementById(
    "secciones-tops"
  );

  contenedor.innerHTML = categorias.map(cat => `
    <section class="seccion-top" id="${cat.id}">

      <div class="titulo-categoria">
        <span class="icono-categoria">
          ${cat.icono}
        </span>

        <h2>Mis tops de ${cat.nombre}</h2>

        <p>${cat.descripcion}</p>
      </div>

      <div class="filtros">
        ${crearFiltros(cat)}
      </div>

      <div
        id="productos-${cat.id}"
        class="rejilla-tops">
      </div>

    </section>
  `).join("");

  // Activar filtros de cada sección
  contenedor.querySelectorAll(
    ".filtros select"
  ).forEach(select => {
    select.addEventListener("change", () => {
      const seccion = select.closest(
        ".seccion-top"
      );

      mostrarProductos(seccion.id);
    });
  });
}


// =======================================
// 8. CREAR TARJETA DE UN PRODUCTO
// =======================================

function crearTarjeta(producto, cat, posicion) {
  const etiquetas = [
    producto.gama,
    ...Object.values(producto.atributos || {})
  ].filter(Boolean);

  const imagen = producto.foto
    ? `
      <img
        src="${escapar(producto.foto)}"
        alt="${escapar(producto.nombre)}"
        loading="lazy">
    `
    : `
      <span class="imagen-placeholder">
        ${cat.icono}
      </span>
    `;

  const id = idComentario(cat.id, producto.id);

  const pregunta = cat.id === "labiales"
    ? "¿Ya probaste este labial? Cuéntame cómo te fue."
    : "¿Has probado este maquillaje? Comparte tu experiencia.";

  return `
    <article class="tarjeta-top"
             data-producto="${escapar(id)}">

      <div class="imagen-producto">

        <span class="numero-top">
          TOP #${posicion}
        </span>

        ${imagen}

      </div>

      <div class="informacion-producto">

        <span class="marca-producto">
          ${escapar(producto.marca)}
        </span>

        <h3>${escapar(producto.nombre)}</h3>

        <div class="etiquetas-producto">
          ${etiquetas.map(etiqueta => `
            <span class="etiqueta-producto">
              ${escapar(etiqueta)}
            </span>
          `).join("")}
        </div>

        <p class="opinion">
          <strong>♡ Mi opinión:</strong>
          ${escapar(producto.opinion || "")}
        </p>

        <!-- COMENTARIOS DE ESTE PRODUCTO -->
        <details class="comentarios">

          <summary>
            💬 Ver y compartir experiencias
          </summary>

          <div class="cuerpo-comentarios">

            <div class="lista-comentarios">
              <p class="sin-comentarios">
                Cargando comentarios...
              </p>
            </div>

            <form class="form-comentario"
                  data-producto="${escapar(id)}">

              <p>${pregunta}</p>

              <label>
                Tu nombre
                <input
                  type="text"
                  name="nombre"
                  minlength="2"
                  maxlength="40"
                  placeholder="Escribe tu nombre"
                  required>
              </label>

              <label>
                Tu comentario
                <textarea
                  name="texto"
                  minlength="3"
                  maxlength="500"
                  placeholder="Cuéntame tu experiencia..."
                  required></textarea>
              </label>

              <button
                type="submit"
                class="boton-comentar"
                ${conexion ? "" : "disabled"}>
                Publicar comentario ♡
              </button>

              <span class="estado-comentarios">
                ${conexion
                  ? ""
                  : "Comentarios pendientes de activar."}
              </span>

            </form>

          </div>

        </details>

      </div>

    </article>
  `;
}


// =======================================
// 9. MOSTRAR TOPS Y APLICAR FILTROS
// =======================================

function mostrarProductos(categoriaId) {
  const cat = categorias.find(
    c => c.id === categoriaId
  );

  if (!cat) return;

  const contenedor = document.getElementById(
    "productos-" + categoriaId
  );

  // Cancelar escuchas anteriores para
  // evitar duplicar los comentarios.
  (escuchas[categoriaId] || []).forEach(
    cancelar => cancelar()
  );

  escuchas[categoriaId] = [];

  const seccion = document.getElementById(
    categoriaId
  );

  const seleccionados = {};

  seccion.querySelectorAll(
    "select[data-atributo]"
  ).forEach(select => {
    if (select.value) {
      seleccionados[
        select.dataset.atributo
      ] = select.value;
    }
  });

  const productos = misTops[categoriaId] || [];

  const filtrados = productos
    .map((producto, indice) => ({
      producto,
      posicion: indice + 1
    }))
    .filter(({producto}) => {
      return Object.entries(seleccionados)
        .every(([clave, valor]) => {

          if (clave === "gama") {
            return producto.gama === valor;
          }

          return (
            producto.atributos?.[clave] === valor
          );
        });
    });

  // Aún no hay tops
  if (productos.length === 0) {
    contenedor.innerHTML = `
      <div class="seccion-vacia"
           style="grid-column: 1 / -1">
        <span>🌷</span>
        <h3>Próximamente mis favoritos</h3>
        <p>
          Muy pronto compartiré mis recomendaciones
          en esta categoría. ♡
        </p>
      </div>
    `;
    return;
  }

  // Los filtros no encontraron productos
  if (filtrados.length === 0) {
    contenedor.innerHTML = `
      <div class="seccion-vacia"
           style="grid-column: 1 / -1">
        <span>🌸</span>
        <h3>No hay productos con estos filtros</h3>
        <p>
          Prueba seleccionar otra característica.
        </p>
      </div>
    `;
    return;
  }

  // Mostrar tarjetas
  contenedor.innerHTML = filtrados.map(
    ({producto, posicion}) =>
      crearTarjeta(producto, cat, posicion)
  ).join("");

  // Cargar comentarios si Firebase está activo
  if (conexion) {
    contenedor.querySelectorAll(
      ".tarjeta-top"
    ).forEach(tarjeta => {
      escucharComentarios(tarjeta, categoriaId);
    });
  } else {
    contenedor.querySelectorAll(
      ".lista-comentarios"
    ).forEach(lista => {
      lista.textContent =
        "Los comentarios se habilitarán próximamente.";
    });
  }
}


// =======================================
// 10. MOSTRAR COMENTARIOS PÚBLICOS
// =======================================

function escucharComentarios(tarjeta, categoriaId) {
  const { db, firestore } = conexion;
  const id = tarjeta.dataset.producto;

  const lista = tarjeta.querySelector(
    ".lista-comentarios"
  );

  const referencia = firestore.collection(
    db,
    "comentarios_por_producto",
    id,
    "mensajes"
  );

  const consulta = firestore.query(
    referencia,
    firestore.orderBy("creadoEn", "desc"),
    firestore.limit(30)
  );

  const cancelar = firestore.onSnapshot(
    consulta,

    resultado => {
      lista.replaceChildren();

      if (resultado.empty) {
        const mensaje = document.createElement("p");
        mensaje.className = "sin-comentarios";
        mensaje.textContent =
          "Todavía no hay comentarios. ¡Sé la primera persona!";
        lista.append(mensaje);
        return;
      }

      resultado.forEach(documento => {
        const comentario = documento.data();

        const elemento = document.createElement("div");
        elemento.className = "comentario";

        const nombre = document.createElement("strong");
        nombre.textContent = comentario.nombre;

        const texto = document.createElement("p");
        texto.textContent = comentario.texto;

        elemento.append(nombre, texto);
        lista.append(elemento);
      });
    },

    error => {
      console.error("Error al leer comentarios:", error);
      lista.textContent =
        "No se pudieron cargar los comentarios.";
    }
  );

  escuchas[categoriaId].push(cancelar);
}


// =======================================
// 11. PUBLICAR UN COMENTARIO
// =======================================

document.getElementById(
  "secciones-tops"
).addEventListener("submit", async evento => {

  const formulario = evento.target.closest(
    ".form-comentario"
  );

  if (!formulario) return;

  evento.preventDefault();

  if (!conexion) return;

  const nombre = formulario.elements.nombre.value.trim();
  const texto = formulario.elements.texto.value.trim();

  if (
    nombre.length < 2 ||
    nombre.length > 40 ||
    texto.length < 3 ||
    texto.length > 500
  ) {
    return;
  }

  const boton = formulario.querySelector("button");
  const estado = formulario.querySelector(
    ".estado-comentarios"
  );

  boton.disabled = true;
  estado.textContent = "Publicando comentario...";

  try {
    const { db, auth, firestore } = conexion;

    await firestore.addDoc(
      firestore.collection(
        db,
        "comentarios_por_producto",
        formulario.dataset.producto,
        "mensajes"
      ),
      {
        nombre: nombre,
        texto: texto,
        uid: auth.currentUser.uid,
        creadoEn: firestore.serverTimestamp()
      }
    );

    formulario.reset();
    estado.textContent = "¡Comentario publicado! ♡";

  } catch (error) {
    console.error(error);

    estado.textContent =
      "No se pudo publicar. Inténtalo nuevamente.";
  } finally {
    boton.disabled = false;
  }
});


// =======================================
// 12. CONECTAR FIREBASE
// =======================================

async function conectarFirebase() {

  // Si no configuraste Firebase,
  // el catálogo seguirá funcionando.
  if (
    !firebaseConfig.apiKey ||
    !firebaseConfig.authDomain ||
    !firebaseConfig.projectId ||
    !firebaseConfig.appId
  ) {
    return;
  }

  try {
    // Firebase desde CDN:
    // no necesitas instalar npm.
    const version = "13.2.0";
    const base = "https://www.gstatic.com/firebasejs/";

    const [appLib, authLib, firestoreLib] =
      await Promise.all([
        import(${base}${version}/firebase-app.js),
        import(${base}${version}/firebase-auth.js),
        import(${base}${version}/firebase-firestore.js)
      ]);

    const app = appLib.initializeApp(firebaseConfig);
    const auth = authLib.getAuth(app);

    // Los visitantes pueden comentar
    // sin registrarse con correo.
    await authLib.signInAnonymously(auth);

    const db = firestoreLib.getFirestore(app);

    conexion = {
      auth: auth,
      db: db,
      firestore: firestoreLib
    };

    // Activar comentarios de todos los tops
    categorias.forEach(cat => {
      mostrarProductos(cat.id);
    });

  } catch (error) {
    console.error(
      "No fue posible activar los comentarios:",
      error
    );
  }
}


// =======================================
// 13. INICIAR EL BLOG
// =======================================

crearMenu();
crearSecciones();

categorias.forEach(cat => {
  mostrarProductos(cat.id);
});

conectarFirebase();