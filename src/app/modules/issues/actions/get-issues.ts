import { sleep } from "@helpers/index";
import { environment } from "src/environments/environment.development";
import { GithubIssue, State } from "../interfaces";

const BASE_URL = environment.apiUrl;
const TOKEN = environment.token;

export const getIssues = async(state: State = State.All): Promise<GithubIssue[]> => {
  //TODO: Investigate Result Pattern

  await sleep(1500);

  const params = new URLSearchParams();
  params.append('state', state);

  try {
    const resp = await fetch(
      `${BASE_URL}/repos/angular/angular/issues?${params}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    if (!resp.ok) throw `Can't load issues`

    const issues: GithubIssue[] = await resp.json();

    return issues;
  } catch (error) {
    throw `Can't load issues`;
  }
}