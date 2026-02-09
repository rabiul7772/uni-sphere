import type { UserDetail } from '@/services/users/apiUsers';

const useUniqueDepartmentsAndSubjects = (user: UserDetail | undefined) => {
  const departments = user
    ? user.role === 'teacher'
      ? Array.from(
          new Map(
            user.classes?.map(cls => [
              cls.subject.department.id,
              cls.subject.department
            ]) || []
          ).values()
        )
      : Array.from(
          new Map(
            user.enrollments?.map(enr => [
              enr.class.subject.department.id,
              enr.class.subject.department
            ]) || []
          ).values()
        )
    : [];

  const subjects = user
    ? user.role === 'teacher'
      ? Array.from(
          new Map(
            user.classes?.map(cls => [cls.subject.id, cls.subject]) || []
          ).values()
        )
      : Array.from(
          new Map(
            user.enrollments?.map(enr => [
              enr.class.subject.id,
              enr.class.subject
            ]) || []
          ).values()
        )
    : [];

  return { departments, subjects };
};

export default useUniqueDepartmentsAndSubjects;
