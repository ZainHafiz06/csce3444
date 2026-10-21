import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { FEATURE_HEADERS, RootStackParamList } from '../navigation/types';
import { useShellNav } from '../navigation/useShellNav';
import FindShell from '../components/FindShell';
import SectionHeader from '../components/SectionHeader';
import FinderItemCard from '../components/FinderItemCard';
import FormModal from '../components/FormModal';
import PlainInput from '../components/PlainInput';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS, FONTS, LAYOUT } from '../theme';
import { createItem, getItems } from '../services/finderService';
import { FinderItem, FinderReportType } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Finder'>;

/** Campus lost and found — a light checkpoint implementation, no AI matching. */
export default function FinderScreen(_: Props) {
  const nav = useShellNav();
  const [items, setItems] = useState<FinderItem[] | null>(null);
  const [reportType, setReportType] = useState<FinderReportType | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const refresh = () => getItems().then(setItems);

  useEffect(() => {
    refresh();
  }, []);

  const openReport = (type: FinderReportType) => setReportType(type);
  const closeReport = () => setReportType(null);

  const submit = async () => {
    if (!reportType || !title.trim() || !description.trim() || submitting) return;
    setSubmitting(true);
    await createItem({ reportType, title, description, approximateLocation: location });
    setTitle('');
    setDescription('');
    setLocation('');
    setSubmitting(false);
    closeReport();
    refresh();
  };

  return (
    <FindShell
      title={FEATURE_HEADERS.Finder}
      mode="find"
      activeFeature="Finder"
      {...nav}
      onCreate={() => openReport('lost')}
    >
      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={() => openReport('lost')}>
          <Feather name="alert-circle" size={13} color={COLORS.findBright} />
          <Text style={styles.actionText}>Report Lost Item</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={() => openReport('found')}>
          <Feather name="check-circle" size={13} color={COLORS.plan} />
          <Text style={styles.actionText}>Report Found Item</Text>
        </Pressable>
      </View>

      <SectionHeader>recently found:</SectionHeader>
      {items && items.length === 0 ? (
        <Text style={styles.empty}>no nearby reports yet.</Text>
      ) : (
        <View style={styles.feed}>
          {items?.map((item) => <FinderItemCard key={item.id} item={item} />)}
        </View>
      )}

      <FormModal
        visible={!!reportType}
        title={reportType === 'lost' ? 'report lost item' : 'report found item'}
        onClose={closeReport}
      >
        <View style={styles.fields}>
          <PlainInput placeholder="item title" value={title} onChangeText={setTitle} />
          <PlainInput placeholder="description" value={description} onChangeText={setDescription} multiline />
          <PlainInput placeholder="approximate location (optional)" value={location} onChangeText={setLocation} />
        </View>
        <PrimaryButton
          label="submit report"
          onPress={submit}
          disabled={!title.trim() || !description.trim() || submitting}
          style={styles.submit}
        />
      </FormModal>
    </FindShell>
  );
}

const styles = StyleSheet.create({
  actions: { flexDirection: 'row', gap: 10, marginTop: LAYOUT.tilesToSection },
  actionButton: {
    flex: 1,
    height: 40,
    borderRadius: 13,
    backgroundColor: COLORS.tile,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  actionText: { color: '#E6E6E6', fontFamily: FONTS.medium, fontSize: 9.5 },
  feed: { gap: 10 },
  empty: { color: '#777777', fontFamily: FONTS.regular, fontSize: 11, lineHeight: 18 },
  fields: { gap: 11 },
  submit: { marginTop: 16 },
});
