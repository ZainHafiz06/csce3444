import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FEATURE_HEADERS, RootStackParamList } from '../navigation/types';
import { useShellNav } from '../navigation/useShellNav';
import FindShell from '../components/FindShell';
import SectionHeader from '../components/SectionHeader';
import GhostPostCard from '../components/GhostPostCard';
import FormModal from '../components/FormModal';
import PlainInput from '../components/PlainInput';
import PrimaryButton from '../components/PrimaryButton';
import { FONTS } from '../theme';
import { createPost, getActivePosts } from '../services/ghostService';
import { GhostPost } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Ghost'>;

/** An ephemeral nearby feed — posts expire on their own, never a permanent profile feed. */
export default function GhostScreen(_: Props) {
  const nav = useShellNav();
  const [posts, setPosts] = useState<GhostPost[] | null>(null);
  const [composerOpen, setComposerOpen] = useState(false);
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  const [posting, setPosting] = useState(false);

  const refresh = () => getActivePosts().then(setPosts);

  useEffect(() => {
    refresh();
  }, []);

  const submit = async () => {
    if (!text.trim() || posting) return;
    setPosting(true);
    await createPost(text, location);
    setText('');
    setLocation('');
    setPosting(false);
    setComposerOpen(false);
    refresh();
  };

  return (
    <FindShell
      title={FEATURE_HEADERS.Ghost}
      mode="find"
      activeFeature="Ghost"
      {...nav}
      onCreate={() => setComposerOpen(true)}
    >
      <SectionHeader first>nearby right now:</SectionHeader>
      {posts && posts.length === 0 ? (
        <Text style={styles.empty}>nothing nearby yet.</Text>
      ) : (
        <View style={styles.feed}>
          {posts?.map((post) => <GhostPostCard key={post.id} post={post} />)}
        </View>
      )}

      <FormModal visible={composerOpen} title="new ghost post" onClose={() => setComposerOpen(false)}>
        <View style={styles.fields}>
          <PlainInput placeholder="what's happening nearby?" value={text} onChangeText={setText} multiline />
          <PlainInput placeholder="approximate location (optional)" value={location} onChangeText={setLocation} />
        </View>
        <PrimaryButton label="post" onPress={submit} disabled={!text.trim() || posting} style={styles.submit} />
      </FormModal>
    </FindShell>
  );
}

const styles = StyleSheet.create({
  feed: { gap: 10 },
  empty: { color: '#777777', fontFamily: FONTS.regular, fontSize: 11, lineHeight: 18 },
  fields: { gap: 11 },
  submit: { marginTop: 16 },
});
