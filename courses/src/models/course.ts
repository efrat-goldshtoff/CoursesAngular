export class Course {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public teacherId: number,
        public lessons: Lesson[]
    ) { }
}

export class CourseAdd {
    constructor(
        public title: string,
        public description: string,
        public teacherId: number,
    ) { }
}

export class Lesson {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public courseId: number
    ) { }
}

