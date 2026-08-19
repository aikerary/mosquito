import Card from "@/components/ui/Card";
import {
  Plus,
  PackagePlus,
  FolderPlus,
  ImagePlus,
} from "lucide-react";

const actions = [
  {
    title: "Nuevo producto",
    description: "Agregar un repelente",
    icon: PackagePlus,
  },
  {
    title: "Nueva colección",
    description: "Crear una colección",
    icon: FolderPlus,
  },
  {
    title: "Subir imagen",
    description: "Agregar multimedia",
    icon: ImagePlus,
  },
];

export default function QuickActions() {
  return (
    <Card className="p-6">
      <div className="mb-5 flex items-center gap-2">
        <Plus className="h-5 w-5 text-emerald-600" />

        <h3 className="font-semibold text-slate-900">
          Acciones rápidas
        </h3>
      </div>

      <div className="space-y-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              type="button"
              className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Icon className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {action.title}
                </p>

                <p className="text-xs text-slate-400">
                  {action.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}