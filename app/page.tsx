import type { Metadata } from 'next';
import Blindagem from '@/components/Blindagem';
export const metadata: Metadata = { title: 'Blindagem NanoTitanium | PM Cell Vacaria', description: 'Conheça a aplicação da blindagem NanoTitanium com cura UV na PM Cell Vacaria. Consulte o valor para seu celular e agende pelo WhatsApp.', openGraph: { title: 'Blindagem NanoTitanium | PM Cell Vacaria', description: 'Uma nova camada de cuidado para o seu celular.' } };
export default function Home() { return <Blindagem />; }
