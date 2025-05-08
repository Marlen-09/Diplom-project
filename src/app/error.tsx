"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Можно добавить логирование ошибки на сервер
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Что-то пошло не так</h2>
        <p className="text-gray-600 mb-6">
          Произошла ошибка при обработке вашего запроса. Попробуйте перезагрузить страницу.
        </p>
        <button
          onClick={reset}
          className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          Попробовать снова
        </button>
      </div>
    </div>
  );
}