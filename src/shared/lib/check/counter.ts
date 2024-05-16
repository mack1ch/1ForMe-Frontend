import { ITraining } from "@/shared/interface/training";

function getTimeDiff(start: Date, end: Date): string {
  const diff = start.getTime() - end.getTime();
  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor(diff / 1000 / 60 / 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Функция, которая отображает оставшееся время до начала тренировки и обновляет его каждую секунду
export function showCountdownToTraining(training: ITraining): void {
  const countdownElement = document.getElementById("countdown");
  if (!countdownElement) return;

  const updateCountdown = () => {
    const currentDate = new Date();
    const trainingDate = new Date(
      `${training.date}T${training.slot.beginning}`
    );
    if (trainingDate > currentDate) {
      const timeDiff = getTimeDiff(trainingDate, currentDate);
      countdownElement.innerText = `До начала тренировки: ${timeDiff}`;
    } else {
      countdownElement.innerText = "Тренировка уже началась или прошла";
      clearInterval(interval);
    }
  };

  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);
}
