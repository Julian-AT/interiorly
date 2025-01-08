import {
  type Document,
  DocumentAccess,
  type User,
} from '@interiorly/collaboration/types';

interface Props {
  documentAccesses: Document['accesses'];
  groupIds: User['groupIds'];
  userId: User['id'];
}

const accessLevelHierarchy = [
  DocumentAccess.NONE,
  DocumentAccess.READONLY,
  DocumentAccess.EDIT,
  DocumentAccess.FULL,
];

export function getDocumentAccess({
  documentAccesses,
  userId,
  groupIds,
}: Props) {
  let accessLevel = documentAccesses.default;
  // If a group id is higher than default access, use this
  for (const groupId of groupIds) {
    const groupAccess = documentAccesses.groups[groupId];
    if (
      accessLevelHierarchy.indexOf(groupAccess) >
      accessLevelHierarchy.indexOf(accessLevel)
    ) {
      accessLevel = groupAccess;
    }
  }

  let userAccess = documentAccesses.users[userId];

  // If EDIT access set at user level, give FULL access
  if (userAccess === DocumentAccess.EDIT) {
    userAccess = DocumentAccess.FULL;
  }

  // If a user id is higher than default access, use this
  if (
    accessLevelHierarchy.indexOf(userAccess) >
    accessLevelHierarchy.indexOf(accessLevel)
  ) {
    accessLevel = userAccess;
  }

  return accessLevel;
}
