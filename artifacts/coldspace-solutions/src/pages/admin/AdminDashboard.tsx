import { Link } from "wouter";
import { MessageSquare, Edit3, Users } from "lucide-react";
import { useGetContacts, useGetContent } from "@workspace/api-client-react";

export default function AdminDashboard() {
  const { data: contacts } = useGetContacts();
  const { data: content } = useGetContent();

  const stats = [
    {
      label: "Mensajes Recibidos",
      value: contacts?.length || 0,
      icon: MessageSquare,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      href: "/admin/contacts"
    },
    {
      label: "Textos y Elementos Editables",
      value: content?.length || 0,
      icon: Edit3,
      color: "text-green-500",
      bgColor: "bg-green-100",
      href: "/admin/content"
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Panel de Administración</h1>
        <p className="text-slate-500 mt-2">Bienvenido al sistema gestor de contenidos de ColdSpace Solutions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center gap-6">
              <div className={`${stat.bgColor} ${stat.color} p-4 rounded-lg`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div>
                <p className="text-slate-500 font-medium mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-800">Últimos Mensajes</h2>
        </div>
        <div className="p-0">
          {(!contacts || contacts.length === 0) ? (
            <div className="p-6 text-center text-slate-500">No hay mensajes recientes.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {contacts.slice(0, 5).map((contact) => (
                <div key={contact.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-slate-800">{contact.name}</h3>
                    <span className="text-sm text-slate-500">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">{contact.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {contacts && contacts.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 text-center">
            <Link href="/admin/contacts">
              <span className="text-primary hover:text-primary/80 font-medium cursor-pointer">Ver todos los mensajes</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
