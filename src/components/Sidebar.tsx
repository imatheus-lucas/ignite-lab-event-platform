import classnames from "classnames";
import { List, X } from "phosphor-react";
import { useState } from "react";
import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";
import { Logo } from "./Logo";

export function Sidebar() {
  const { data } = useGetLessonsQuery();
  const [isMobileSideNavVisible, setIsMobileSideNavVisible] = useState(false);

  function handleToggleMobileSidenav() {
    setIsMobileSideNavVisible((prev) => !prev);
  }
  return (
    <>
      <div className="flex gap-2 p-6 justify-between   fixed top-0 right-0 md:hidden z-[51] w-full bg-gray-700 ">
        <div className="h-[2rem] flex items-center justify-center">
          <Logo />
        </div>
        <div className="flex items-center justify-center gap-2">
          <span>Aulas</span>
          <button
            className="text-green-500"
            onClick={handleToggleMobileSidenav}
          >
            {isMobileSideNavVisible ? <X size={30} /> : <List size={30} />}
          </button>
        </div>
      </div>
      <aside
        className={classnames(
          "p-6 fixed left-0  z-[50] w-screen h-full overflow-y-auto md:relative md:top-0 md:not-sr-only md:w-[348px] bg-gray-700 md:p-6 border-l border-gray-600 rounded-b-lg",
          {
            "sr-only": !isMobileSideNavVisible,
          }
        )}
      >
        <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
          Cronograma de aulas
        </span>

        <div className="flex flex-col gap-8">
          {data?.lessons.map((lesson) => (
            <Lesson
              key={lesson.id}
              title={lesson.title}
              slug={lesson.slug}
              availableAt={new Date(lesson.availableAt)}
              type={lesson.lessonType}
              disableSidebar={handleToggleMobileSidenav}
            />
          ))}
        </div>
      </aside>
    </>
  );
}
