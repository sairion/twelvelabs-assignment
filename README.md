# Twelve labs assignment

```text
Functionality 1. See the list of videos that MeTube uploaded / indexed

1. Use the index “Random videos” for this assignment. (index id: 64014bcee5857ca95a830c6d)
2. Use the List Videos API (Link: https://docs.twelvelabs.io/reference/list-videos)

Functionality 2. Filter the list of videos with categories automatically generated by Classify API

1. Use the sample class group “Tiktok Topics” in the Playground to create classes for the index
2. Use Classify API to generate tags and attach them to each video (Link: https://docs.twelvelabs.io/docs/content-classification)

Functionality 3. Perform a search using Search API and view the search results by video level.

1. Users should be to type in any search queries in the search bar to find the videos (Use all the available search options)
2. Use the Search API to perform search and retrieve results (Link: https://docs.twelvelabs.io/docs/search-simple-queries)
```

### Assumptions that you made that are not specified in the scenario

- 각 기능이 동일한 화면에서 구현되는 것을 기대하는 것인지 조금 혼동이 되었습니다만, 각 api가 분리되어 있는 만큼 각 시나리오별로 페이지들을 분리했습니다. (/list /classify /search)
- Functionality 2 의 'create classes for the index' 는 api로 획득하는 것이 아니라 playground 쪽에서 미리 만들어진 class들을 복사하는 것이라고 가정했습니다.
- Functionality 2에서 사용자가 tag를 눌러서 분류하고 싶은 니즈가 있을 것 같아 해당 기능을 추가했습니다.
- 비디오 썸네일을 구분해야 하는 만큼 타이틀과 시간을 추가했습니다.
- 레이아웃은 pc에서 보는 것을 가정하고 구성했습니다.
- api 키는 홈페이지 상 허용된 도메인 등에 대한 옵션이 없어 아무 곳에서나 요청할 수 있는 구조로 보여저서, 소스에 노출하지 않도록 했습니다 (환경 변수 이용)

### Major technical challenges that you expect during the implementation

- 특별히 큰 어려움은 느끼지 못했습니다만, api 호출 제한(1초에 1회)에 따른 사용 흐름을 어떻게 구성할 것인지가 고민되었습니다. 따라서 유저가 search-as-you-type 으로 구현하는 것을 지양하고, 에러가 발생했을 때 1초 이상의 텀을 주어 재시도하도록 설정했습니다.
- search api가 group_by 인자에 따라 다른 형태의 값을 내려주는 것을 나중에 인지해서 typing을 고민해야 했습니다. (union 및 type guard로 해결)

### Major Constraints or limitations whether it is due to the API, infrastructure, etc

_Why do we need this? Many of our clients do not have a technical background. Therefore, most of the time, we would need to provide a list of technical requirements given their use case._

- 일부 api에는 thumbnail이나 비디오에 대한 정보가 포함되어 있지 않아 해당 api들을 비디오별로 따로 호출해야 해서 HTTP 요청의 수가 많아졌습니다.

### Tell us the total time it took for you to

- Understand our API, Playground, and its core functionality
  - 2시간
- Writing the README file
  - 30분
- Setting up the project
  - 30분 (create-next-app과 shadcn/ui 등 라이브러리 사용, 문서로 사용 방법 파악, Vercel 배포 등)
- Actual Implementation of the functionalities
  - 11시간
