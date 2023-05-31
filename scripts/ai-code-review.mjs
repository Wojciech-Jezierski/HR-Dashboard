import { Gitlab } from "@gitbeaker/node";
import { ChatGPTAPI } from "chatgpt";

const gitlabToken = process.env.TOKEN;
const openAIToken = process.env.OPEN_AI_TOKEN;
const projectId = process.env.CI_PROJECT_ID;
const mergeRequestId = process.env.CI_MERGE_REQUEST_IID;

const introMessage = `
Assume you are an experienced senior developer and reviewer of Pull Request.
You will review the code made by junior developer.
Consider following areas during code review: Code style/quality, Best practice, Safety, Error handling, Security, Software design, Performance, Documentation.
The code is written in React, Typescript.
Don't describe the code you see, just point the things to improve one by one and give code examples.
Examine the code in detail and list specific comments and tips. 
Keep the answers short but concise.
Answer in polish language.
I will send you code diffs in subsequent messages.
`;

const maximumCharactersLengthForReview = 5000;
const maximumAmountOfFilesForReview = 20;

const api = new Gitlab({
  token: gitlabToken,
});
const chatGpt = new ChatGPTAPI({
  apiKey: openAIToken,
});

const getTypescriptFiles = (diff) => {
  return diff.filter(
    (file) => file.new_path.endsWith(".ts") || file.new_path.endsWith(".tsx")
  );
};

const filterFilesForReview = (files) => {
  return files.filter(
    (file) => file.diff.length <= maximumCharactersLengthForReview
  );
};

const sortFilesByLength = (files) => {
  return files.sort((a, b) => a.diff.length - b.diff.length);
};

const getFilesForReview = async () => {
  const commits = await api.MergeRequests.commits(projectId, mergeRequestId);
  const latestCommit = commits[0];

  if (!latestCommit) {
    return [];
  }

  const latestCommitDiffs = await api.Commits.diff(projectId, latestCommit.id);
  const typescriptFiles = getTypescriptFiles(latestCommitDiffs);
  const filesForReview = filterFilesForReview(typescriptFiles);

  return sortFilesByLength(filesForReview).slice(
    0,
    maximumAmountOfFilesForReview
  );
};

const createMergeRequestDiscussion = (message) => {
  return api.MergeRequestDiscussions.create(projectId, mergeRequestId, message);
};

const run = async () => {
  const filesForReview = await getFilesForReview();

  const { id } = await chatGpt.sendMessage(introMessage);

  let lastMessageId = id;

  for (const file of filesForReview) {
    const { id, text } = await chatGpt.sendMessage(file.diff, {
      parentMessageId: lastMessageId,
    });

    lastMessageId = id;

    await createMergeRequestDiscussion(
      `File: ${file.new_path}

Automated review:

${text}`
    );
  }
};

try {
  run();
} catch (e) {
  console.log(e);
  await createMergeRequestDiscussion(
    "Nie udało się sprawdzić kodu za pomocą OpenAI"
  );
}
