console.log("MAPPED TYPES");

/*interface Person {
  name: string;
  age?: number; // unsafe
}*/

interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: "Sávio",
  age: 23,
};

console.log("Interface Person~> ", person);

const personPartial: Partial<Person> = {
  name: "João",
};

const personPartial2: Partial<Person> = {
  age: 20,
};

console.log("Partial~> ", personPartial, personPartial2);

const personReadOnly: Readonly<Person> = {
  name: "Cleber",
  age: 21,
};

console.log("ReadOnly~> ", personReadOnly);

// can't do that
// personReadOnly.name = "Sávio";

// generic type for transform properties in string
type Stringfy<T> = {
  [P in keyof T]: string;
};

/*
const personString: Stringfy<Person> = {
  name: "Sávio",
  age: 23, // it must be string
};
*/

const personString: Stringfy<Person> = {
  name: "Sávio",
  age: "23",
};

console.log("Only String~> ", personString);

type StringfyReadOnly<T> = {
  readonly [P in keyof T]: string;
};

const personStringReadOnly: StringfyReadOnly<Person> = {
  name: "Joana",
  age: "33",
};

// can't do
// personStringReadOnly.age = "1";

console.log("TYPE GUARDS");

// example with types primitives
function printType(value: number | string) {
  if (typeof value === "number") {
    // functions specific for type number
    // console.log(value.toFixed());
    console.log("number");
  } else if (typeof value === "string") {
    // functions specific for type string
    // console.log(value.length);
    console.log("string");
  }
}

printType(22.2);
printType("22.2");

interface Dev {
  name: string;
  language: string;
}

interface Designer {
  name: string;
  software: string;
}

const personDev: Dev = { name: "João Dev", language: "Java" };
const personDesigner: Designer = { name: "Gabriel", software: "Figma" };

function printSkill(person: Dev | Designer) {
  if ("language" in person) {
    console.log(person.language);
  } else if ("software" in person) {
    console.log(person.software);
  }
}

printSkill(personDesigner);

// best pratice
function isDeveloper(person: Dev | Designer): person is Dev {
  return "language" in person;
}

function printSkillImproved(person: Dev | Designer) {
  if (isDeveloper(person)) {
    console.log(person.language);
  } else {
    console.log(person.software);
  }
}

printSkillImproved(personDev);

console.log("NUMERIC SEPARATOR");

const exampleNumericSeparator = 100_000_000;

console.log(exampleNumericSeparator);

console.log("INTERFACES VS TYPES");

interface IProfessional {
  name: string;
}

// merge declaration, only with interfaces
interface IProfessional {
  age: number;
}

const professional: IProfessional = { name: "Ana", age: 27 };

console.log(professional);

type Professional = {
  name: string;
};

// can't rewrite
/*
type Professional = {
  age: number;
};
*/

type StringfyExample<T> = {
  [P in keyof T]: string;
};

// can't do that
/*
interface IStringfy<T>{
    [P in keyof T]: string;
};
*/

// example alias with type
type UserName = string;
function getName(name: UserName) {
  console.log(name);
}
// getName(name: string): void
getName("Eduarda");

type ProfessionalType = IProfessional;
function getProfessional(person: ProfessionalType) {
  console.log(person);
}
// getProfessional(person: IProfessional): void
getProfessional({ name: "Maria", age: 31 });

console.log("INTERSECTION TYPES");

import { Address, User, mergeTypes } from "./types";

const user: User = {
  name: "Alberto",
  age: 51,
};

const address: Address = {
  street: "Rua das Flores",
  zipCode: "65400000",
};

const userWithAddress: User & Address = {
  name: "Francisco",
  age: 41,
  street: "Rua Paraguai",
  zipCode: "1231231",
};

console.log(userWithAddress);

const userWithAddress2: User & Address = { ...user, ...address };

console.log(userWithAddress2);

const userWithAddress3 = mergeTypes(user, address);

console.log(userWithAddress3);

console.log("UTILITY TYPES");

// example
interface Car {
  brand: string;
  model: string;
  color: string;
  year?: number;
}

type CarRequired = Required<Car>;
/*{
    brand: string;
    color: string;
    year: number;
    model: string;
}*/

type CarPartial = Partial<Car>;
/*{
    brand?: string | undefined;
    color?: string | undefined;
    year?: number | undefined;
    model?: string | undefined;
}*/

type CarPickBrandAndModel = Pick<Car, "brand" | "model">;
/*{
    brand: string;
    model: string;
}*/

type CarOmitBrandAndModel = Omit<Car, "brand" | "model">;
/*{
    color: string;
    year?: number | undefined;
}*/

interface Post {
  title: string;
  subtitle: string;
}

type SectionNames = "sports" | "nutrition" | "business";
type PostsRecord = Record<SectionNames, Post[]>;
/*{
    sports: Post[];
    nutrition: Post[];
    business: Post[];
}*/

const postMappedBySections: PostsRecord = {
  sports: [
    {
      title:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      subtitle:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
  ],
  nutrition: [
    {
      title:
        "Contrary to popular belief, Lorem Ipsum is not simply random text.",
      subtitle:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    },
  ],
  business: [
    {
      title:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
      subtitle:
        "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters",
    },
  ],
};
