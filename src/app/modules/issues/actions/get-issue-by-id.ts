import { sleep } from "@helpers/index";
import { environment } from "src/environments/environment.development";
import { GithubIssue } from "../interfaces";

const BASE_URL = environment.apiUrl;
const TOKEN = environment.token;

export const getIssueById = async(issueId: string): Promise<GithubIssue> => {
  //TODO: Investigate Result Pattern

  await sleep(1500);
  try {
    const resp = await fetch(
      `${BASE_URL}/repos/angular/angular/issues/${issueId}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    if (!resp.ok) throw `Can't load issue`

    const labels: GithubIssue = await resp.json();
    console.log({labels});

    return labels;
  } catch (error) {
    throw `Can't load labels`;
  }
}