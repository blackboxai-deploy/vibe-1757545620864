import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { SystemProvider } from '@/contexts/SystemContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Festa Kids Pro - Sistema de Gerenciamento",
  description: "Sistema completo de gerenciamento para festas infantis - clientes, eventos, equipe, materiais e financeiro",
  keywords: ["festas infantis", "gerenciamento", "eventos", "crianças", "animação"],
  authors: [{ name: "Festa Kids Pro" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <SystemProvider>
          {children}
        </SystemProvider>
      </body>
    </html>
  );
}