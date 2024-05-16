import { ISlotsForStudio } from "@/shared/interface/slots";

export function countAvailableSlotsForStudios(slots?: ISlotsForStudio[]) {
  let count = 0;
  slots?.forEach((studio) => {
    studio.clubSlots.forEach((slot) => {
      if (slot.isAvailable) {
        count++;
      }
    });
  });
  return count;
}
