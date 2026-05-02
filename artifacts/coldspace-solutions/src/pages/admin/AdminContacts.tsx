import { useGetContacts } from "@workspace/api-client-react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function AdminContacts() {
  const { data: contacts, isLoading } = useGetContacts();
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Cargando mensajes...</div>;
  }

  const filteredContacts = contacts?.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.service.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Mensajes de Contacto</h1>
          <p className="text-slate-500 mt-1">Revisa las solicitudes enviadas a través de la web.</p>
        </div>
        
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input 
            placeholder="Buscar por nombre, email o servicio..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredContacts.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No se encontraron mensajes.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                  <th className="py-4 px-6 font-semibold">Fecha</th>
                  <th className="py-4 px-6 font-semibold">Cliente</th>
                  <th className="py-4 px-6 font-semibold">Servicio</th>
                  <th className="py-4 px-6 font-semibold hidden md:table-cell">Mensaje</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6 text-sm whitespace-nowrap text-slate-500">
                      {new Date(contact.createdAt).toLocaleDateString()}
                      <br/>
                      <span className="text-xs">{new Date(contact.createdAt).toLocaleTimeString()}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-slate-800">{contact.name}</div>
                      <div className="text-sm text-slate-500">{contact.email}</div>
                      {contact.phone && <div className="text-sm text-slate-500">{contact.phone}</div>}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                        {contact.service.toUpperCase()}
                      </span>
                      <div className="text-xs text-slate-500 mt-1">Lang: {contact.language}</div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600 max-w-xs md:max-w-md">
                      <p className="line-clamp-3">{contact.message}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
