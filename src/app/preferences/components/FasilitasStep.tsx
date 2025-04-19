import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { usePreferenceStore } from "@/stores/preference.store";

export default function FasilitasStep({ data, isLoading }: any) {
  const kostFacility = usePreferenceStore((state) => state.kostFacilities);
  const setKostFacility = usePreferenceStore(
    (state) => state.setKostFacilities
  );
  const roomFacility = usePreferenceStore((state) => state.roomFacilities);
  const setRoomFacility = usePreferenceStore(
    (state) => state.setRoomFacilities
  );

  const toggleFacility = (
    currentList: string[],
    setList: (f: string[]) => void,
    id: string,
    checked: boolean
  ) => {
    const updated = checked
      ? [...currentList, id]
      : currentList.filter((x) => x !== id);
    setList(updated);
  };

  if (isLoading) return <p>Loading fasilitas...</p>;
  if (!data) return <p>Gagal memuat fasilitas</p>;

  const fasilitasKostList = data.filter((f: any) => f.kategori === "kost");
  const fasilitasKamarList = data.filter((f: any) => f.kategori === "kamar");

  return (
    <>
      <div>
        <Label>Fasilitas Kost</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {fasilitasKostList.map((item: any) => (
            <label key={item._id} className="flex items-center gap-2">
              <Checkbox
                checked={kostFacility.includes(item._id)}
                onCheckedChange={(val) =>
                  toggleFacility(kostFacility, setKostFacility, item._id, !!val)
                }
              />
              {item.nama_fasilitas}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Label>Fasilitas Kamar</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {fasilitasKamarList.map((item: any) => (
            <label key={item._id} className="flex items-center gap-2">
              <Checkbox
                checked={roomFacility.includes(item._id)}
                onCheckedChange={(val) =>
                  toggleFacility(roomFacility, setRoomFacility, item._id, !!val)
                }
              />
              {item.nama_fasilitas}
            </label>
          ))}
        </div>
      </div>
    </>
  );
}
