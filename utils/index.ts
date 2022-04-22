import { Subject, SubjectWeightings, YearRange } from "../types";

export const getSubjectPMF = (ranks: SubjectWeightings) => {
  const weightings = Object.values(ranks);
  const sum = weightings.reduce((a, b) => a + b, 0);

  return weightings.map((w) => w / sum);
};
const weightedRandomChoice = <T>(items: T[], weights: number[]) => {
  // https://stackoverflow.com/a/55671924/15032172
  var i;

  for (i = 0; i < weights.length; i++) weights[i] += weights[i - 1] || 0;

  var random = Math.random() * weights[weights.length - 1];

  for (i = 0; i < weights.length; i++) if (weights[i] > random) break;

  return items[i];
};
const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const getRandomSubject = (subjectWeights: SubjectWeightings) => {
  const pmf = getSubjectPMF(subjectWeights);
  const subjects = Object.keys(subjectWeights) as Subject[];
  const subject = weightedRandomChoice(subjects, pmf);

  return subject;
};

export const mySubjectWeightings: SubjectWeightings = {
  "2P1": 9,
  "2P2": 3,
  "2P3": 7,
  "2P4": 9,
  "2P5": 5,
  "2P6": 6,
  "2P7": 5,
};

export const getRandomQuestion = (
  subjectWeights: SubjectWeightings,
  yearRange: YearRange
) => {
  const question = randomIntFromInterval(1, 6);
  const year = randomIntFromInterval(yearRange[0], yearRange[1]);
  const subject = getRandomSubject(subjectWeights);

  return { subject, year, question };
};