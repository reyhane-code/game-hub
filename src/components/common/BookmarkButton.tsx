import React, { useEffect, useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import Modal from './Modal';
import useAuthStore from '../../auth.store';
import { HttpRequest } from '../../helpers/http-request-class.helper';

interface BookmarkButtonProps {
    entity: string;
    id: number;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ entity, id }) => {
    const accessToken = useAuthStore((s) => s.auth.tokens.accessToken);
    const [bookmarked, setBookmarked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const checkIfBookmarked = async () => {
            if (!accessToken) return; // Exit if not logged in

            try {
                const res = await HttpRequest.get<boolean>(`/v1/bookmarks/user/bookmarked/${entity}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (res) {
                    const data = res.data;
                    setBookmarked(data);
                    console.log('user bookmarked', data); // Log the actual bookmarked status
                }
            } catch (error) {
                console.error('Error checking bookmark status:', error);
            }
        };

        checkIfBookmarked();
    }, [entity, id, accessToken]); // Add accessToken to the dependency array

    const handleBookmark = async () => {
        if (!accessToken) {
            setModalOpen(true);
            return;
        }

        const isBookmarking = !bookmarked;
        const url = `/v1/bookmarks/${entity}/${id}`;

        setLoading(true);

        try {
            const res =
                isBookmarking
                    ? await HttpRequest.post(url, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    })
                    : await HttpRequest.delete(url, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    });

            if (!res) {
                throw new Error('Network response was not ok');
            }

            setBookmarked(isBookmarking);
        } catch (error) {
            console.error('Error bookmarking/unbookmarking:', error);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={handleBookmark} disabled={loading} style={{ cursor: 'pointer', padding: '10px', fontSize: '16px' }}>
                <div className='w-full flex justify-between items-center'>
                    {loading ? 'Loading...' : bookmarked ? <FaBookmark className='text-lg' /> : <FaRegBookmark className='text-lg' />}
                </div>
            </button>
            <Modal
                isOpen={modalOpen}
                onClose={closeModal}
                title="Login Required"
                message="You must be logged in to bookmark this item."
            />
        </div>
    );
};

export default BookmarkButton;
