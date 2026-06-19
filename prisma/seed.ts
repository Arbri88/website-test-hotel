import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import bcrypt from 'bcryptjs'

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? 'file:./dev.db' })
const prisma = new PrismaClient({ adapter })

async function main() {
  // Create admin user
  const adminExists = await prisma.user.findUnique({ where: { email: 'admin@terrazzadisole.com' } })
  if (!adminExists) {
    await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@terrazzadisole.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
      },
    })
    console.log('✓ Admin user created')
  }

  // Create demo user
  const userExists = await prisma.user.findUnique({ where: { email: 'demo@terrazzadisole.com' } })
  if (!userExists) {
    await prisma.user.create({
      data: {
        name: 'Marco Rossi',
        email: 'demo@terrazzadisole.com',
        password: await bcrypt.hash('demo123', 10),
        role: 'user',
      },
    })
    console.log('✓ Demo user created')
  }

  // Check if rooms already exist
  const roomCount = await prisma.room.count()
  if (roomCount === 0) {
    const rooms = [
      {
        name: 'Lemon Grove Suite',
        description: 'Wake to the scent of lemon blossoms and the sound of waves. This ground-floor suite opens directly onto a private garden terrace surrounded by centuries-old lemon trees.',
        price: 350,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1200&h=800&fit=crop',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop',
        ]),
        amenities: JSON.stringify(['Sea View', 'Private Garden', 'King Bed', 'Vietri Ceramics', 'Mini Bar']),
        capacity: 2,
      },
      {
        name: 'Ceramic Terrace Room',
        description: 'Perched on the cliff edge, this room features a wraparound terrace with hand-painted ceramic tiles in traditional Amalfi patterns.',
        price: 450,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&h=800&fit=crop',
          'https://images.unsplash.com/photo-1566665797739-1674de7a4217?w=1200&h=800&fit=crop',
        ]),
        amenities: JSON.stringify(['Panoramic Terrace', 'King Bed', 'Rain Shower', 'Terracotta Floors', 'Espresso Machine']),
        capacity: 2,
      },
      {
        name: 'Infinity Panorama Suite',
        description: 'Our signature suite crowns the hotel with 270-degree views stretching from Positano to Capri. The private infinity pool appears to merge with the sea below.',
        price: 650,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f4ac?w=1200&h=800&fit=crop',
          'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&h=800&fit=crop',
        ]),
        amenities: JSON.stringify(['Private Infinity Pool', 'Living Room', 'Walk-in Closet', 'Marble Bathroom', 'Butler Service']),
        capacity: 4,
      },
      {
        name: 'Sunrise Belvedere',
        description: 'Catch the first light of day from your east-facing balcony. This charming room captures the sunrise over the cliffs with a warm palette that shifts from gold to rose.',
        price: 280,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&h=800&fit=crop',
          'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&h=800&fit=crop',
        ]),
        amenities: JSON.stringify(['Sunrise View', 'Queen Bed', 'Balcony', 'Rainfall Shower', 'Complimentary Breakfast']),
        capacity: 2,
      },
    ]

    for (const room of rooms) {
      await prisma.room.create({ data: room })
    }
    console.log('✓ 4 rooms created')
  }

  console.log('✓ Database seeded successfully')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
