type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
};
type Tag = {
  id: string;
  name: string;
};
type TagListModel = {
  data: Tag[];
  remove: (id: string) => boolean;
  update: (id: string, name: string) => "success" | "not found" | "duplicated";
  fetch: () => Tag[];
  create: (name: string) => "success" | "duplicated"; //success表示成功，duplicated表示重复
  save: () => void;
};
