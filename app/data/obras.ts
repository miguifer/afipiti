import { client } from "@/sanity";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function urlFor(source: any) {
  return builder.image(source);
}

export interface Obra {
  _id: string;
  titulo: string;
  tecnica: string;
  año: string;
  dimensiones: string;
  descripcion: string;
  precio?: string;
  disponible: boolean;
  imageUrl: string;
}

interface SanityArtwork {
  _id: string;
  titulo: string;
  tecnica?: string;
  ano?: string;
  dimensiones?: string;
  descripcion?: string;
  precio?: string;
  disponible?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
}

function mapSanityToObra(artwork: SanityArtwork): Obra {
  return {
    _id: artwork._id,
    titulo: artwork.titulo || "Sin título",
    tecnica: artwork.tecnica || "Técnica mixta",
    año: artwork.ano || "Fecha desconocida",
    dimensiones: artwork.dimensiones || "Dimensiones no especificadas",
    descripcion: artwork.descripcion || "",
    precio: artwork.precio || "Consultar",
    disponible: artwork.disponible ?? true,
    imageUrl: artwork.image ? urlFor(artwork.image).width(800).url() : "",
  };
}

const fetchOptions = { next: { revalidate: 30 } };

// Función principal para obtener obras desde Sanity
export async function fetchObras(limit: number = 12): Promise<Obra[]> {
  const query = `*[_type == "artwork"] | order(_createdAt desc)[0...${limit}]{
    _id,
    titulo,
    tecnica,
    ano,
    dimensiones,
    descripcion,
    precio,
    disponible,
    image
  }`;

  const artworks = await client.fetch<SanityArtwork[]>(query, {}, fetchOptions);
  return artworks.map(mapSanityToObra);
}

// Función para obtener una obra específica por ID
export async function getObraById(id: string): Promise<Obra | null> {
  const query = `*[_type == "artwork" && _id == $id][0]{
    _id,
    titulo,
    tecnica,
    ano,
    dimensiones,
    descripcion,
    precio,
    disponible,
    image
  }`;

  const artwork = await client.fetch<SanityArtwork | null>(query, { id }, fetchOptions);
  return artwork ? mapSanityToObra(artwork) : null;
}

// Función para obtener obras relacionadas (excluyendo la actual)
export async function getObrasRelacionadas(currentId: string, limit: number = 3): Promise<Obra[]> {
  const query = `*[_type == "artwork" && _id != $currentId] | order(_createdAt desc)[0...${limit}]{
    _id,
    titulo,
    tecnica,
    ano,
    dimensiones,
    descripcion,
    precio,
    disponible,
    image
  }`;

  const artworks = await client.fetch<SanityArtwork[]>(query, { currentId }, fetchOptions);
  return artworks.map(mapSanityToObra);
}

// Función para buscar obras por término
export async function searchObras(query: string, limit: number = 12): Promise<Obra[]> {
  const groqQuery = `*[_type == "artwork" && (titulo match $searchTerm || descripcion match $searchTerm)] | order(_createdAt desc)[0...${limit}]{
    _id,
    titulo,
    tecnica,
    ano,
    dimensiones,
    descripcion,
    precio,
    disponible,
    image
  }`;

  const artworks = await client.fetch<SanityArtwork[]>(
    groqQuery,
    { searchTerm: `*${query}*` },
    fetchOptions
  );
  return artworks.map(mapSanityToObra);
}
