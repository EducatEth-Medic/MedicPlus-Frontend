// app/api/wallets/[address]/route.ts

export async function GET(req: Request, { params }: { params: { address: string } }) {
  const { address } = params; // Accede al parámetro 'address' desde la URL

  // Aquí puedes validar que la dirección tenga un formato correcto
  if (!address || address.length !== 42) {
    return new Response("Dirección de wallet no válida", { status: 400 });
  }

  // Aquí simulas la información de la wallet (esto debe conectarse a una API real en producción)
  const walletData = {
    balance: "2.5", // Ejemplo de balance en ETH
    transactions: [
      { txHash: "0x123", from: address, to: "0x8757c7D953ea058baCDF82717Caf403Bd01F1099" },
      { txHash: "0x456", from: "0x8757c7D953ea058baCDF82717Caf403Bd01F1099", to: address },
    ],
    name: "Juan Perez",
    age: 30,
    photo:
      "https://st3.depositphotos.com/8358248/19230/i/450/depositphotos_192301432-stock-photo-intellectual-man-looking-camera-smiling.jpg",
  };

  // Retornar la respuesta con los datos de la wallet en formato JSON
  return new Response(JSON.stringify(walletData), { status: 200 });
}
