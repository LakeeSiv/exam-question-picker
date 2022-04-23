import {
  Links,
  Log,
  Question,
  Subject,
  SubjectWeightings,
  YearRange,
} from "../types";

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
export const getRandomQuestion = (
  subjectWeights: SubjectWeightings,
  yearRange: YearRange
) => {
  const question = randomIntFromInterval(1, 6);
  const year = randomIntFromInterval(yearRange[0], yearRange[1]);
  const subject = getRandomSubject(subjectWeights);

  return { subject, year, question } as Question;
};
export const getLinks = (question: Question): Links => {
  const { subject, year } = question;
  const base = `https://cribs-static.netlify.app/IB/tripos/${subject}/`;

  return {
    paper: `${base}QP_${year}.pdf`,
    cribs: `${base}CRIB_${year}.pdf`,
  };
};
export const addLog = (log: Log, setLogs: any) => {
  setLogs((logs: Log[]) => [
    ...logs,
    { ...log, dateOfSubmission: new Date().toISOString() },
  ]);
};
