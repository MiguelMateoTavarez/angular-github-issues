import { GithubLabel } from "../interfaces/github-label.interface";

export const getLabels = async(): Promise<GithubLabel[]> => {
  //TODO: Investigate Result Pattern

  try {
    const resp = await fetch(`https://api.github.com/repos/angular/angular/labels`);
    if (!resp.ok) throw `Can't load labels`

    const labels: GithubLabel[] = await resp.json();
    console.log({labels});

    return labels;
  } catch (error) {
    throw `Can't load labels`;
  }
}