import { useState } from "react";
import { useGetContent, useUpdateContent } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// We define a list of common keys we want the user to be able to edit
// If the key exists in DB, we use it, otherwise we default to empty until saved
const CONTENT_KEYS = [
  { key: "hero_title", label: "Título Hero", type: "text" },
  { key: "hero_subtitle", label: "Subtítulo Hero", type: "textarea" },
  { key: "about_text", label: "Texto 'Sobre Nosotros'", type: "textarea" },
  { key: "hero_bg_image", label: "Imagen Fondo Hero (URL)", type: "text" },
];

export default function AdminContent() {
  const { data: content, isLoading, refetch } = useGetContent();
  const updateContentMutation = useUpdateContent();
  const { toast } = useToast();

  const [localValues, setLocalValues] = useState<Record<string, string>>({});

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Cargando contenido...</div>;
  }

  // Find value in DB or local override
  const getValue = (key: string) => {
    if (localValues[key] !== undefined) return localValues[key];
    const dbItem = content?.find((item) => item.key === key);
    return dbItem?.value || "";
  };

  const handleChange = (key: string, val: string) => {
    setLocalValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = async (key: string) => {
    const value = getValue(key);
    try {
      await updateContentMutation.mutateAsync({
        key,
        data: { value },
      });
      toast({
        title: "Guardado exitoso",
        description: `El contenido '${key}' ha sido actualizado.`,
      });
      refetch();
    } catch (err) {
      toast({
        title: "Error al guardar",
        description: "Hubo un problema al actualizar el contenido.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Contenido Dinámico</h1>
        <p className="text-slate-500 mt-2">
          Modifica los textos e imágenes de la página web. Los cambios se reflejarán de inmediato.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-800">Campos Principales</h2>
        </div>
        <div className="p-6 space-y-6">
          {CONTENT_KEYS.map((item) => (
            <div key={item.key} className="flex flex-col gap-2 pb-6 border-b border-slate-100 last:border-0 last:pb-0">
              <div className="flex justify-between items-center">
                <label className="font-medium text-slate-700">{item.label}</label>
                <span className="text-xs text-slate-400 font-mono">key: {item.key}</span>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  {item.type === "textarea" ? (
                    <Textarea 
                      value={getValue(item.key)} 
                      onChange={(e) => handleChange(item.key, e.target.value)}
                      rows={4}
                      className="resize-y"
                    />
                  ) : (
                    <Input 
                      value={getValue(item.key)} 
                      onChange={(e) => handleChange(item.key, e.target.value)}
                    />
                  )}
                </div>
                <Button 
                  onClick={() => handleSave(item.key)}
                  disabled={updateContentMutation.isPending}
                  className="bg-primary hover:bg-primary/90 mt-1"
                >
                  Guardar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
