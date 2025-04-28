"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

//since this is a client component, Next.js will not utilize code splitting leading to a large bundle size
//so we will import the forms dynamically using next/dynamic
// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";

//using lazy loading to load the forms dynamically otherwise all the forms were being loaded
const AnnouncementForm = dynamic(() => import("./forms/AnnouncementForm"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const AssignmentForm = dynamic(() => import("./forms/AssignmentForm"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const AttendanceForm = dynamic(() => import("./forms/AttendanceForm"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const ExamForm = dynamic(() => import("./forms/ExamForm"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const EventForm = dynamic(() => import("./forms/EventForm"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const LessonForm = dynamic(() => import("./forms/LessonForm"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const ParentForm = dynamic(() => import("./forms/ParentForm"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const ResultForm = dynamic(() => import("./forms/ResultForm"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const forms: {
  [key: string] : (type: "create" | "update", data?: any) => JSX.Element
} = {
  announcement: (type, data) => <AnnouncementForm type={type} data={data} />,
  attendance: (type, data) => <AttendanceForm type={type} data={data} />,
  assignment: (type, data) => <AssignmentForm type={type} data={data} />,
  class: (type, data) => <ClassForm type={type} data={data} />,
  event: (type, data) => <EventForm type={type} data={data} />,
  exam: (type, data) => <ExamForm type={type} data={data} />,
  lesson: (type, data) => <LessonForm type={type} data={data} />,
  parent: (type, data) => <ParentForm type={type} data={data} />,
  result: (type, data) => <ResultForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
  subject: (type, data) => <SubjectForm type={type} data={data} />,
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table: keyof typeof forms;
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
}) => {
  const size = "w-8 h-8";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
        ? "bg-lamaSky"
        : "bg-lamaPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">All data will be lost. Are you sure?</span>
        <button className="bg-red-700 text-white px-4 py-2 rounded-md w-min self-center">Delete</button>
      </form>
    ) : type === "create" || type === "update" ? (
      <div className="h-fit">
        {forms[table](type, data)}
      </div>
    ) : null;
  };

  return (
    <>
      <button
        className={`${size} ${bgColor} flex items-center justify-center rounded-full`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form/>
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} style={{ opacity: 0.5 }}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
